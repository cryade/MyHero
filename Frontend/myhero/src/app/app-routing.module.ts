import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { RateHeroComponent } from './components/rate-hero/rate-hero.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path : "", component: HomeComponent, canActivate: [AuthGuard]},
  { path : "rate", component: RateHeroComponent, canActivate: [AuthGuard] },
  { path : "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path : "login", component: LoginPageComponent, canActivate: [AuthGuard]},
  { path : "register", component: RegisterPageComponent, canActivate: [AuthGuard] },
  { path : "**", component: NotFoundPageComponent } //TODO: Make 404 Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
