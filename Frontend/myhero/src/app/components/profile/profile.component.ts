import { Component, OnInit } from "@angular/core";
import { UsersService } from "~app/services/users.service";
import { User } from "~app/models/user.model";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  private editForm;
  private heroList: Object;
  private user: User = new User;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      userName: ["lol", Validators.required],
      firstName: "",
      lastName: "",
      email: ["", Validators.required],
      street: "",
      houseNr: 0,
      city: "",
      birthdate: "",
      postalCode: 0
    });
  }

  ngOnInit() {
    this.heroList = [
      { name: "Midoriya Izuku", location: "My heart", price: "100000 yen" },
      {
        name: "Bakugou Katsuki",
        location: "my dungeon",
        price: "like a billion $"
      },
      {
        name: "Todoroki Shouto",
        location: "my other dungeon",
        price: "free if you ask nicely"
      },
      { name: "Fenrir", location: "my heart", price: "forget it" }
    ];

    // Get Info of logged in user, then enter it into the edit form
    this.usersService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.reloadForm();
    });
  }

  onSubmit(formData){
    console.log(formData)
    this.usersService.editUser(formData).subscribe((result) =>{
     console.log("result: ", result);
     this.user=result;
     this.reloadForm();
    });
  }

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
}
