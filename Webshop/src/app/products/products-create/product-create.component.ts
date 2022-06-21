import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  isLoading = false;
  form: FormGroup;


  constructor(public productsService: ProductService, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('productId')){
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {id: productData._id, title: productData.title, content: productData.content};
        });
        this.form.setValue({title: this.product.title, content: this.product.content});
      }else{
        this.mode = 'create';
        this.productId = null;
      }
    });
  }


  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }

  onSaveProduct(){
    if(this.form.invalid){
      return;
    }
    if(this.mode === 'create' ){
      this.productsService.addProduct(this.form.value.title, this.form.value.content);
    }else{
      this.productsService.updateProduct(this.productId, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }
}
