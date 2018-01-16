import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductsService {

  constructor(private db:AngularFireDatabase) { }
 
  create(product){
    this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  getProduct(productId){
    return this.db.object('/products/'+productId);
  }

  updateProduct(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }

  deleteProduct(productId){
    return this.db.object('/products/'+productId).remove();
  }


}
