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

  hasAccess: boolean;
  result: any;
  loggedIn;

  constructor(private usersService: UsersService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    this.usersService.checkLoggedInStatus();
    let url: string = state.url;
    return this.checkUrl(url);
  }

  checkUrl(url: string): boolean {

    console.log(url);

    console.log("logged", this.usersService.loggedIn);
    if (this.usersService.loggedIn === true){
    
      //access to login and register pages only if logged out, else redirect to home-page
      if (url === "/login" || url === "/register"){
        this.hasAccess = false;
        this.router.navigate(['']);
        
      } else {
        this.hasAccess = true;
      }
    } else {
      //access to all other pages only if logged in, else redirect to login page
      if (url !== "/login" && url !== "/register"){
        this.hasAccess = false;
        this.router.navigate(['/login']);
        
      } else {
        this.hasAccess = true;
      }
    }
    return this.hasAccess; //return hasAccess for guard to be active (not working since i can't check session)
  }

  // isLoggedIn(){
  //     return this.usersService.checkLoggedInStatus().subscribe(result => {
  //       this.result = result
  //       console.log(this.result.loggedIn)
  //       return this.result.loggedIn});
  // }
  
}
