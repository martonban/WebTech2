import { Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ProductService{
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();
  constructor(private http: HttpClient, private router: Router){}

  getProducts(){
    this.http
    .get<{message: string; product: any}>('http://localhost:3000/api/product')
    .pipe(
      map(productData => {
      return productData.product.map(product => {
        return {
          id: product._id,
          title: product.title,
          content: product.content,
          imagePath: product.imagePath
        };
      });
    }))
    .subscribe(transfomedProducts => {
      this.products = transfomedProducts;
      this.productsUpdated.next([...this.products]);
    });
  }

  getProductUpdateListener(){
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string){
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string}>
    ('http://localhost:3000/api/product/' + id);
  }

  addProduct(title: string, content: string, image: File){
    const productData = new FormData();
    productData.append("title", title);
    productData.append("content", content);
    productData.append("image", image, title);
    this.http.post<{message: string, product: Product}>('http://localhost:3000/api/product', productData)
    .subscribe(responseData => {
      const product: Product = {
        id: responseData.product.id,
        title: title,
        content: content,
        imagePath: responseData.product.imagePath
      };
      this.products.push(product);
      this.productsUpdated.next([...this.products]);
      this.router.navigate(["/"]);
    });
  }

  deleteProduct(productId: string){
    this.http.delete("http://localhost:3000/api/product/" + productId)
    .subscribe(() => {
      console.log("DELETED");
      const updatedProduct = this.products.filter(product => product.id !== productId);
      this.products = updatedProduct;
      this.productsUpdated.next([...this.products]);
    });
  }


  updateProduct(id: string, title: string, content: string, image: File | string){
    let productData: Product | FormData;
    if(typeof image === "object"){
      productData = new FormData();
      productData.append("id", id);
      productData.append("title", title);
      productData.append("content", content);
      productData.append("image", image, title);
    }else{
      productData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/product/' + id, productData)
    .subscribe(response => {
      const updatedProducts = [...this.products];
      const oldProductIndex = updatedProducts.findIndex(p => p.id === id);
      const product: Product = {
        id: id,
        title: title,
        content: content,
        imagePath: ""};
      updatedProducts[oldProductIndex] = product;
      this.products = updatedProducts;
      this.productsUpdated.next([...this.products]);
      this.router.navigate(["/"]);
    });
  }

}
