import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BuildingAccountComponent } from './building-account/building-account.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // an empty path is the main page
  { path: 'home', component: HomeComponent },
  { path: 'join', component: SignupComponent },
  { path: 'building-account', component: BuildingAccountComponent }
];

@NgModule({
  // .forRoot takes our root rout config
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
