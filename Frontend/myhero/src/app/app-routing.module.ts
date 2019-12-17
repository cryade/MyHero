import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { RateHeroComponent } from './components/rate-hero/rate-hero.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';



const routes: Routes = [
  { path : "", component: HomeComponent},
  { path : "rate", component: RateHeroComponent },
  { path : "profile", component: ProfileComponent },
  { path : "login", component: LoginPageComponent},
  { path : "register", component: RegisterPageComponent },
  { path : "**", component: NotFoundPageComponent } //TODO: Make 404 Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
