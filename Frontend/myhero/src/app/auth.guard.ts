import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean = false;
  hasAccess: boolean;

  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    console.log(url);

    if (url === "/login" || url === "/register"){
      //access to login and register pages only if logged out, else redirect to home-page
      if (this.isLoggedIn){
        this.router.navigate(['']);
        this.hasAccess = false;
      } else {
        this.hasAccess = true;
      }
    } else {
      //access to all other pages only if logged in, else redirect to login page
      if (!this.isLoggedIn){
        this.router.navigate(['/login']);
        this.hasAccess = false;
      } else {
        this.hasAccess = true;
      }
    }
    return this.hasAccess;
  }
}
