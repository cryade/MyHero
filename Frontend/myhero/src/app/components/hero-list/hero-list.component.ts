import { Component, OnInit } from '@angular/core';

import { Hero } from '~app/models/hero.model';
import { HeroesService } from '~app/services/heroes.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

    public heroList: Hero[];
    
  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
      // this.heroList = [
      //   {name: "Midoriya Izuku", location: "Musutafu", price: "100000 yen"},
      //   {name: "Bakugou Katsuki", location: "my dungeon", price: "like a billion $"},
      //   {name: "Todoroki Shouto", location: "my other dungeon", price: "free if you ask nicely"},
      //   {name: "Fenrir", location: "my heart", price: "forget it"}
      // ]
      this.getHeroList();
  }

  getHeroList(){

    this.heroesService.getHeroes()
      .subscribe((heroes: Hero[]) => this.heroList = heroes);
  }

  firstClick(){
    alert("Profile opens!");
  }

  secondClick(){
    alert("Book now!");
  }
}
