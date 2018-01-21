import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
product:Product[];
filteredproduct:any[];
subscription:Subscription;

  constructor(private productService:ProductsService) {
  this.subscription=this.productService.getAll().subscribe(p=>{this.filteredproduct=
     this.product=p;
   })
   }

  ngOnInit() {
  }

  filter(query){
this.filteredproduct=(query)?
this.product.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
this.product
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
