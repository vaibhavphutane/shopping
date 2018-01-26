import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { shoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser:AppUser;
  cart$:Observable<shoppingCart>
  constructor(private auth:AuthService,private cartService:ShoppingCartService) {}

 logout(){
    this.auth.logout();
 }

 async ngOnInit(){
  this.auth.appUser$.subscribe(appUser=>this.appUser=appUser)
this.cart$= await this.cartService.getCart();
}

}