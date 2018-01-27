import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';   
import { shoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart:shoppingCart;
  
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){    
   this.cartService.updateQuantity(this.product,1);
  }

  removeFromCart(){
    this.cartService.updateQuantity(this.product,-1);
  }

 

}
