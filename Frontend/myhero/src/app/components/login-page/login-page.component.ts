import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  onSubmit(userdata){
    console.log(userdata.userName);
    this.usersService.logIn(userdata).subscribe(
      (result) => console.log("result:", result)
    ),
    error => {
      if (error.status === 400) alert("Wrong username oder password");
      else console.log("An error occured:", error.message);
    };
  }

}
