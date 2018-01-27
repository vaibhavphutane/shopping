import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { shoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
    
   }

   create(){
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime() 
    });
   }

   async  getCart():Promise<Observable<shoppingCart>>{
     let cartId=  await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' +cartId).map(x=>new shoppingCart(x.items))
   }
   async clearCart(){
     let cartId = await this.getOrCreateCartId();
     this.db.object('/shopping-carts/'+cartId+'/items').remove();
   }
   private async getOrCreateCartId():Promise<string>{
    let cartId=localStorage.getItem('cartId');
    if(cartId)
      return cartId;
    let result= await this.create();
    localStorage.setItem('cartId',result.key)
    return result.key
    }

   getItem(cartId:string,productId:String){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
   }

  async updateQuantity(product:Product,change:number){
     let cartId= await this.getOrCreateCartId();
     let item$ = this.getItem(cartId,product.$key);
     
     item$.take(1).subscribe(item=>{
       let quantity=(item.quantity || 0) + change
       if(quantity==0)
       item$.remove();
       else
         item$.update({
          title:product.title,
          imageUrl:product.imageUrl,
          price:product.price,
          quantity:quantity
        })
     });

   }

}
