import {Component, Input} from "@angular/core";

@Component({
  selector : 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{

  /*
  products = [
    {title:"Miért jó az OpenGL", content:"Az OpenGL egy nagyon gyors és használtó API az alacsony szintű grafika programozáshoz"},
    {title:"Miért jó a Vulkan", content:"Az Vulkan egy nagyon gyors és használtó API az alacsony szintű grafika programozáshoz"},
    {title:"Miért jó a Metal", content:"Mert a buzi Apple"},
    {title:"Miért jó a three.js", content:"Mert a kurva nehéz a többi"},
  ];
  */


  @Input() products = [];

}
