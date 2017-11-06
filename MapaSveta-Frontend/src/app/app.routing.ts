import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home-component/home.component';
import {LoginComponent} from './component/login-component/login.component';
import {RegisterComponent} from './component/register-component/register.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
