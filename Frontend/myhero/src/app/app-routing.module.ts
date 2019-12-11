import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroProfileComponent } from './components/hero-profile/hero-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RateHeroComponent } from './components/rate-hero/rate-hero.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path : "", component: HomeComponent},
  { path : "heroList", component: HeroListComponent },
  { path : "rate", component: RateHeroComponent },
  { path : "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
