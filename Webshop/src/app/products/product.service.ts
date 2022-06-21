import { ContentChild, Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ProductService{
  private products: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router){}

  getProducts(){
    this.http.get<{message: string, product: any}>('http://localhost:3000/api/product')
    .pipe(map((productData) => {
      return productData.product.map(product => {
        return {
          title: product.title,
          content: product.content,
          id: product._id
        }
      });
    }))
    .subscribe((transfomedProducts) => {
      this.products = transfomedProducts;
      this.productUpdated.next([...this.products]);
    });
  }

  getProductUpdateListener(){
    return this.productUpdated.asObservable();
  }

  getProduct(id: string){
    return this.http.get<{ _id: string; title: string; content: string}>
    ('http://localhost:3000/api/product/' + id);
  }

  addProduct(title: string, content: string, image: File){
    const productData = new FormData();
    productData.append("title", title);
    productData.append("content", content);
    productData.append("image", image, title);
    this.http.post<{message: string, productId: string}>('http://localhost:3000/api/product', productData)
    .subscribe((responseData) => {
      const product: Product = {
        id: responseData.productId,
        title: title,
        content: content
      };
      this.products.push(product);
      this.productUpdated.next([...this.products]);
      this.router.navigate(["/"]);
    });
  }

  deleteProduct(productId: string){
    this.http.delete("http://localhost:3000/api/product/" + productId)
    .subscribe(() => {
      console.log("DELETED");
      const updatedProduct = this.products.filter(product => product.id !== productId);
      this.products = updatedProduct;
      this.productUpdated.next([...this.products]);
    });
  }


  updateProduct(id: string, title: string, content: string){
    const product: Product = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/product/' + id, product)
    .subscribe(response => {
      const updatedProduct = [...this.products];
      const oldProductIndex = updatedProduct.findIndex(p => p.id === product.id);
      updatedProduct[oldProductIndex] = product;
      this.products = updatedProduct;
      this.productUpdated.next([...this.products]);
      this.router.navigate(["/"]);
    });
  }

}
