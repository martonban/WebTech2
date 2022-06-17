import { Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class ProductService{
  private products: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient){}

  getProduct(){
    this.http.get<{message: string, product: Product[]}>('http://localhost:3000/api/product')
    .subscribe((productData) => {
      this.products = productData.product;
      this.productUpdated.next([...this.products]);
    });
  }

  getProductUpdateListener(){
    return this.productUpdated.asObservable();
  }

  addProduct(title: string, content: string){
    const product: Product = { id: null, title: title, content: content};
    this.products.push(product);
    this.productUpdated.next([...this.products]);
  }
}
