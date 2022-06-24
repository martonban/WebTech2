import {Component, OnDestroy, OnInit} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
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
  totalProducts = 0;
  productsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private authStatusSub: Subscription;
  userisAuthenticated = false;

  constructor(public productsService: ProductService, private authService: AuthService){}

  ngOnInit(){
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.productSub = this.productsService.getProductUpdateListener()
    .subscribe((productData: {products: Product[], productCount: number}) => {
        this.totalProducts = productData.productCount;
        this.products = productData.products;
      });
      this.userisAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userisAuthenticated = isAuthenticated;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  onDelete(productId: string){
    this.productsService.deleteProduct(productId).subscribe(() =>{
      this.productsService.getProducts(this.productsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
