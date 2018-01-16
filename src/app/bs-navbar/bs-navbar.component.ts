import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser:AppUser;

  constructor(private auth:AuthService) {
    auth.appUser$.subscribe(appUser=>this.appUser=appUser)
  }

 logout(){
    this.auth.logout();
 }

}

