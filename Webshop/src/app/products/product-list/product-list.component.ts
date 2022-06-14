import {Component, OnDestroy, OnInit} from "@angular/core";
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

  constructor(public productsService: ProductService){}

  ngOnInit(){
    this.products = this.productsService.getProduct();
    this.productSub = this.productsService.getProductUpdateListener().subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }
}
