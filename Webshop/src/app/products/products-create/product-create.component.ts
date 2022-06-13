import {Component, EventEmitter, Output} from "@angular/core";
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


  onAddProduct(){
    const post: Product = {
      title: this.enteredTitle,
      content: this.enteredContetnt
    };
      this.productCreated.emit(post);
  }
}
