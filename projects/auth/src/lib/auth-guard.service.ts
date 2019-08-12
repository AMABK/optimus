import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): 
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   const currentUser = this.authService.currentUserValue;
  //   if (currentUser) {
  //     // authorised so return true
  //     return true;
  //   }
  //   // not logged in so redirect to login page with the return url
  //   this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  } 
}
