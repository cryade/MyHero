import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';


const routes: Routes = [
  { path : "heroes", component: HeroListComponent },
  { path : "heroes/profile/:id", component: HeroProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
