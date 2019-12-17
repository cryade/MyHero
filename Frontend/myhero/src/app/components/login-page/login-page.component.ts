import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UsersService } from '~app/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(userdata){
    console.log(userdata.userName);
    this.usersService.logIn(userdata).subscribe();
  }

}
