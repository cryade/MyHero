import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { AuthGuard } from '~app/auth.guard';


const routes: Routes = [
  { path : "heroes", component: HeroListComponent, canActivate: [AuthGuard] },
  { path : "heroes/profile/:id", component: HeroProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
