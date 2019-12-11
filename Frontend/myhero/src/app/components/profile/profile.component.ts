import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  heroList: Object;
  constructor() { }

  ngOnInit() {
    this.heroList = [
      {name: "Midoriya Izuku", location: "Musutafu", price: "100000 yen"},
      {name: "Bakugou Katsuki", location: "my dungeon", price: "like a billion $"},
      {name: "Todoroki Shouto", location: "my other dungeon", price: "free if you ask nicely"},
      {name: "Fenrir", location: "my heart", price: "forget it"}
    ]
  }

}
