import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product:Product;
  @Input('show-actions') showOptions=true;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
   this.cartService.updateQuantity(this.product,1);
  }

   

}
