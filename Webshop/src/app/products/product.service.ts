import { Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductService{
  private products: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient){}

  getProduct(){
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

  addProduct(title: string, content: string){
    const product: Product = { id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/product', product)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.products.push(product);
      this.productUpdated.next([...this.products]);
    });

  }
}
