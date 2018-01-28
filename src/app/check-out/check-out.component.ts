import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { shoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  cart:shoppingCart;
  subscription:Subscription;
  userSubscription:Subscription;
  userId:string;

  constructor(
    private router:Router,
    private authService:AuthService,
    private shoppingCartservice:ShoppingCartService,
    private orderService:OrderService) { }

  async ngOnInit() {
    let cart$= await this.shoppingCartservice.getCart();
    this.subscription=cart$.subscribe(cart=>this.cart=cart);
    this.userSubscription= this.authService.username$.subscribe(user=>this.userId=user.uid)
  }

  placeOrder(shipping){
   let order={
     userId:this.userId,
     datePlaced: new Date().getTime(),
     shipping:shipping,
     items:this.cart.items.map(item=>{
       return{
         product:{
          title:item.title,
          imageUrl:item.imageUrl,
          price:item.price,
         },
         quantity:item.quantity,
         totalPrice:item.totalPrice
       }
     })
   } 
   let result=this.orderService.StoreOrder(order);
   this.router.navigate(['/order-success',result.key]);
   this.shoppingCartservice.clearCart();
  }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  this.userSubscription.unsubscribe();
  }

}
