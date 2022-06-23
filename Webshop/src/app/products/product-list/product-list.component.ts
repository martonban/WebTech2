import {Component, OnDestroy, OnInit} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Product } from '../product.model';
import { ProductService } from "../product.service";

@Component({
  selector : 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{


  products: Product[] = [];
  private productSub: Subscription;
  totalProducts = 10;
  productsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public productsService: ProductService){}

  ngOnInit(){
    this.productsService.getProducts();
    this.productSub = this.productsService.getProductUpdateListener()
    .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);
  }

  onDelete(productId: string){
    this.productsService.deleteProduct(productId);
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }
}
