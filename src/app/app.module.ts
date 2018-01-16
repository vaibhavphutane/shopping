import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductComponent } from './product/product.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthguardService } from './authguard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent, },
  {path: 'shopping-cart',component: ShoppingCartComponent},
  {path: 'product',component: ProductComponent},
  {path: 'login',component: LoginComponent},
  
  {path: 'check-out',component: CheckOutComponent,canActivate:[AuthguardService]},
  {path: 'order-success',component: OrderSuccessComponent,canActivate:[AuthguardService]},
  {path: 'my-orders',component: MyOrdersComponent,canActivate:[AuthguardService]},
  
  {
    path: 'admin/admin-products',
    component: AdminProductsComponent,
   canActivate:[AuthguardService,AdminAuthGuardService]
  },
  {
    path: 'admin/product-form/:id',
    component: ProductFormComponent,
   canActivate:[AuthguardService,AdminAuthGuardService]
  },
  {
    path: 'admin/product-form',
    component: ProductFormComponent,
   canActivate:[AuthguardService,AdminAuthGuardService]
  },
  {
    path: 'admin/admin-orders',
    component: AdminOrdersComponent,
    canActivate:[AuthguardService,AdminAuthGuardService]
  },
 ]
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(APP_ROUTES),
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule
    
  ],
  providers: [
    AuthService,
   AuthguardService,
   UserService,
   AdminAuthGuardService,
   CategoryService,
   ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
