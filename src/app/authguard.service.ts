import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { RouterStateSnapshot } from '@angular/router/src/router_state';


@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private auth:AuthService,private router:Router) { }

  canActivate(route,state:RouterStateSnapshot){
    return this.auth.username$.map(user => {
      if(user)
      return true;
      else{
          this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
          return false;
      }
    })
  }

}
