import {Component} from "@angular/core";

@Component({
  selector: 'app-product-create',
  templateUrl: '/product-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class ProductCreateComponent{
  enterdValue = '';
  newProduct = 'No Content';

  onAddProduct(){
    this.newProduct= this.enterdValue;
  }
}
