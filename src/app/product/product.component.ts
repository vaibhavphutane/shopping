import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{  
  product: Product[]=[];
  filteredproduct: Product[]=[];
  cart:any;
  cat: string;
  subscription:Subscription;
  constructor(
    private shoppingCartService:ShoppingCartService,  
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

 async ngOnInit() {
    this.subscription=(await this.shoppingCartService.getCart()).subscribe(cart=>this.cart=cart);
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();    
  }
}
