import { Component, OnInit } from '@angular/core';

import { UsersService } from '~app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  logOut(){
    console.log("logged out!");
    this.usersService.logOut().subscribe();
  }

}
