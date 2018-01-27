import { shoppingCartItem } from "./shopping-cart-items";
import { Product } from "./product";

export class shoppingCart{
    items:shoppingCartItem[]=[];   

  constructor(public itemsMap:{[productId:string]:shoppingCartItem}) {
    this.itemsMap= itemsMap || {};
    for(let productId in itemsMap){
    let item= itemsMap[productId];    
    this.items.push( new shoppingCartItem({
      ...item,
      $key:productId
    }));
   }  
  }

  getQuantity(product:Product){
    console.log("in quantity"+product.$key);
    let item=this.itemsMap[product.$key];
    return item? item.quantity: 0;
    }

get productIds(){ 
     return Object.keys(this.items);
 }

 get totalPrice(){
   let sum=0;
   for(let productId in this.items)
    sum += this.items[productId].totalPrice;
   return sum; 
 }
 get totalItemCount(){
    let count=0;
    for (let productId in this.itemsMap){
      count = count + this.itemsMap[productId].quantity;
    }
    return count;   
 }
}