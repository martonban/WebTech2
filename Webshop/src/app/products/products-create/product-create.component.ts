import {Component, EventEmitter, Output} from "@angular/core";
import { NgForm } from "@angular/forms";
import { from } from "rxjs";
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class ProductCreateComponent{
  enteredTitle = '';
  enteredContetnt = '';
  @Output() productCreated = new EventEmitter<Product>();


  onAddProduct(form: NgForm){
    if(form.invalid){
      return;
    }
    const post: Product = {
      title: form.value.title,
      content: form.value.content
    };
      this.productCreated.emit(post);
  }
}
