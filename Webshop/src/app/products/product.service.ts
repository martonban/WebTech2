import { Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Product } from "./product.model";

@Injectable({providedIn: 'root'})
export class ProductService{
  private products: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  getProduct(){
    return [...this.products];
  }

  getProductUpdateListener(){
    return this.productUpdated.asObservable();
  }

  addProduct(title: string, content: string){
    const product: Product = {title: title, content: content};
    this.products.push(product);
    this.productUpdated.next([...this.products]);
  }
}
