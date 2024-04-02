import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //if user is logged in, return true for checkout page
    if(this.auth.authenticated()){
      return true
    } else {
      //if user is not logged in, redirect to login page
      this.router.navigate(['login'])
      return false
    }
  }
}
