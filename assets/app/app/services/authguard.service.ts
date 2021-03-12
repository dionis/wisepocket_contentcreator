import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service'  

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate, CanActivateChild {

  constructor(private userService: UserService,
              private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
              status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
                console.log(this.userService.isLoggedIn());
                return this.userService.isLoggedIn()?true:this.router.navigate(['auth/login']);
              }
  canActivateChild(route: ActivatedRouteSnapshot,
              status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
                return this.canActivate(route,status);
              }
}
