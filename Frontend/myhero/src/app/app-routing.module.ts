import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { ProfileComponent } from './profile/profile.component';
import { RateHeroComponent } from './rate-hero/rate-hero.component';
import { HomeComponent } from './home/home.component';



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
