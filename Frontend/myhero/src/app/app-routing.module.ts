import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { RateHeroComponent } from './components/rate-hero/rate-hero.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path : "", component: HomeComponent},
  { path : "rate", component: RateHeroComponent },
  { path : "profile", component: ProfileComponent },
  { path : "**", component: HomeComponent } //TODO: Make 404 Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
