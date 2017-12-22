import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './components/map-component/map.component';
import {LoginComponent} from './components/login-component/login.component';
import {RegisterComponent} from './components/register-component/register.component';

const appRoutes: Routes = [
  {path: '', component: MapComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
