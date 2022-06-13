import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class ProductCreateComponent{
  enteredTitle = '';
  enteredContetnt = '';
  @Output() productCreated = new EventEmitter();


  onAddProduct(){
    const post = {
      title: this.enteredTitle,
      content: this.enteredContetnt
    };
      this.productCreated.emit(post);
  }
}
