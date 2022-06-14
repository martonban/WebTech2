import {Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { from } from "rxjs";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class ProductCreateComponent{
  enteredTitle = '';
  enteredContetnt = '';


  constructor(public productsService: ProductService){}


  onAddProduct(form: NgForm){
    if(form.invalid){
      return;
    }
      this.productsService.addProduct(form.value.title, form.value.content);
  }
}
