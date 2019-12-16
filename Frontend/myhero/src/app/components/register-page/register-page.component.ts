import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  private registerForm; 


  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      streetNr: '',
      city: '',
      postalCode: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(userdata){
    console.log(userdata.userName);
  }
}
