import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  result: any;
  title = 'myhero';
  userIsLoggedIn: boolean = true;


  constructor(private usersService: UsersService){}

  ngOnInit(){
    this.usersService.checkLoggedInStatus();
  }

//   isLoggedIn() {
//     return this.usersService.checkLoggedInStatus().subscribe((result: Observable<Object>) => {
//       this.result = result
//       console.log(this.result.loggedIn)
//       return this.result.loggedIn}), 
//       error=>console.log(error);
// }

}
