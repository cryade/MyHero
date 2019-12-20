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

  ngOnInit(){
      this.getHeroList();
  }

  getHeroList(){
    this.heroesService.getHeroes()
      .subscribe((heroes: Hero[]) => this.heroList = heroes);
  }

  bookHero(hero: Hero){
    this.heroesService.bookHero(hero._id);
    alert("Succesfully booked hero! Find him and other heroes you booked on yor profile!")
  }
}
