import { shoppingCartItem } from "./shopping-cart-items";

export class shoppingCart{
    items:shoppingCartItem[]=[];   

  constructor(public itemsMap:{[productId:string]:shoppingCartItem}) {
  for(let productId in itemsMap){
    let item= itemsMap[productId];
    this.items.push(new shoppingCartItem(item.product,item.quantity));
}  
  }
  
 get productIds(){
     return Object.keys(this.items);
 }
 get totalItemCount(){
    let count=0;
    for (let productId in this.itemsMap){
      count = count + this.itemsMap[productId].quantity;
    }
    return count;   
 }
}