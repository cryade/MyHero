import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '~app/services/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  private registerForm; 


  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
  ) {
    //initialise form & define which values are required
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: '',
      lastName: '',
      email: ['', Validators.required, Validators.email],
      street: '',
      houseNr: 0,
      city: '',
      birthdate: '',
      postalCode: 0
    });
   }

  ngOnInit() {
  }

  /* Save data entered into registerForm into database via UsersService */
  onSubmit(formData){
    console.log(formData.userName);
    this.usersService.newUser(formData).subscribe(()=>
      this.usersService.loggedIn = true
    ),
    error => {
      if (error.status === 400){
        alert("That username is already taken, please pick a different one");
      } else (console.log("An error occured", error.message))
    }
  };
}
