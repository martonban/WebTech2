import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { from } from "rxjs";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class ProductCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContetnt = '';
  private mode = 'create';
  private productId: string;
  product: Product;


  constructor(public productsService: ProductService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('productId')){
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.productsService.getProduct(this.productId).subscribe(productData => {
          this.product = {id: productData._id, title: productData.title, content: productData.content};
        });
      }else{
        this.mode = 'create';
        this.productId = null;
      }
    });
  }


  onSaveProduct(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode === 'create' ){
      this.productsService.addProduct(form.value.title, form.value.content);
    }else{
      this.productsService.updateProduct(this.productId, form.value.title, form.value.content);
    }

      form.resetForm();
  }
}
