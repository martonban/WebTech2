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
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public productsService: ProductService){}

  ngOnInit(){
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.productSub = this.productsService.getProductUpdateListener()
    .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  onDelete(productId: string){
    this.productsService.deleteProduct(productId);
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }
}
