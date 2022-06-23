import { Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ProductService{
  private products: Product[] = [];
  private productsUpdated = new Subject<{products: Product[], productCount: number}>();
  constructor(private http: HttpClient, private router: Router){}

  getProducts(productsPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string; product: any, maxProducts: number}>('http://localhost:3000/api/product' + queryParams)
    .pipe(
      map(productData => {
      return {products: productData.product.map(product => {
        return {
          id: product._id,
          title: product.title,
          content: product.content,
          imagePath: product.imagePath
        };
      }), maxProducts: productData.maxProducts};
    }))
    .subscribe(transfomedProductData => {
      this.products = transfomedProductData.products;
      this.productsUpdated.next({ products: [...this.products], productCount: transfomedProductData.maxProducts});
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
      this.router.navigate(["/"]);
    });
  }

  deleteProduct(productId: string){
    return this.http.delete("http://localhost:3000/api/product/" + productId);
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
      this.router.navigate(["/"]);
    });
  }

}
