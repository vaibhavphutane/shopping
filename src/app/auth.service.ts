import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import  * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  username$:Observable<firebase.User>;

  constructor(
    private userService:UserService,
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute) {

    this.username$= afAuth.authState;
  }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
 
  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.username$.switchMap(user =>
      { 
        if(user)
        return this.userService.get(user.uid)
        else
        return Observable.of(null)
    })
  }

}
