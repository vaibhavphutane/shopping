import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductsService } from '../../products.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from '../../models/product';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 category$;
 id;
 //product={};
product:Product;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private categoryService:CategoryService,
    private productService:ProductsService) { 
  this.category$=categoryService.getCategories();

  this.id=this.route.snapshot.paramMap.get("id");
  if(this.id)
  this.productService.getProduct(this.id).take(1).subscribe(p=>this.product=p);
  }

  save(product){
    if(this.id)
    this.productService.updateProduct(this.id,product)
    else
    this.productService.create(product);
     this.router.navigate(['/admin/admin-products'])     
  }

  delete(){
    if(confirm("Are you sure you want to delete this product?")&&this.id)
    {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/admin-products']);
    }
  }

  ngOnInit() {
  }

}
