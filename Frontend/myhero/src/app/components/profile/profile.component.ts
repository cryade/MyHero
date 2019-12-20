import { Component, OnInit } from "@angular/core";
import { UsersService } from "~app/services/users.service";
import { User } from "~app/models/user.model";
import { FormBuilder, Validators } from "@angular/forms";
import { HeroesService } from '~app/services/heroes.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  private editForm;
  private rateForm;
  private heroList: Object;
  private user: User = new User;

  constructor(
    private usersService: UsersService,
    private heroesService: HeroesService,
    private formBuilder: FormBuilder
  ) {
    // initialise the edit form & define required values
    this.editForm = this.formBuilder.group({
      userName: ["", Validators.required], //can't actually be changed in this version of MyHero
      firstName: "",
      lastName: "",
      email: ["", Validators.required, Validators.email],
      street: "",
      houseNr: 0,
      city: "",
      birthdate: "",
      postalCode: 0
    });

    this.rateForm = this.formBuilder.group({
      title: ["", Validators.required],
      comment: ["", Validators.required],
      starRating: ["", Validators.required]
    })
  }

  ngOnInit() {
    

    // Get Info of logged in user, then enter it into the edit form
    this.usersService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.reloadForm();
    });
  }

  /* Save data from Edit-Form to database via usersService */
  onSubmit(formData){
    console.log(formData)
    this.usersService.editUser(formData).subscribe((result) =>{
     console.log("result: ", result);
     this.user = result;
     // reload form so that the data that was just changed is now in the form
     this.reloadForm();
    });
  }

  /* (Re-)Load the user-values into the form. If a property of user is undefiend, the field is left empty */
  reloadForm(){
    this.editForm.patchValue({
      userName: this.user.username,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      street: this.user.street,
      houseNr: this.user.housenumber,
      city: this.user.city,
      birthdate: this.user.birthdate,
      postalCode: this.user.postalcode
    });
  }

  rateHero(hero, formData){
    formData.starRating = parseInt(formData.starRating);
    console.log(hero._id)
    this.heroesService.rateHero(hero._id, formData).subscribe(result => console.log(result));
  }

  loadUserData(){
    this.usersService.getCurrentUser().subscribe(data => {
      this.user = data;})
  }
}
