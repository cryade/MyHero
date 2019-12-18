import { Component, OnInit } from "@angular/core";
import { UsersService } from "~app/services/users.service";
import { User } from "~app/models/user.model";
import { FormBuilder } from "@angular/forms";

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
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
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

    this.usersService.getCurrentUser().subscribe(data => (this.user = data));
  }

  onSubmit(formData){
    this.usersService.editUser(formData).subscribe((result) =>{
     console.log("result: ", result);
     this.user=result;
    });
  }
}
