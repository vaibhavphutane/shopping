import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product[]=[];
  filteredproduct: Product[]=[];

  cat: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService) {
      productService.getAll().switchMap(product => {
      this.product = product;
      return route.queryParamMap
       }).subscribe(prams => {
      this.cat = prams.get('category')
      this.filteredproduct=(this.cat) ? 
      this.product.filter(p=>p.category===this.cat):
      this.product; 
    });
  } 

  ngOnInit() {
  }

}
