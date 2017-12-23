import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './components/map-component/map.component';
import {AccountLoginComponent} from './components/account-login-component/account-login.component';
import {AccountRegisterComponent} from './components/account-register-component/account-register.component';

const appRoutes: Routes = [
  {path: '', component: MapComponent},
  {path: 'login', component: AccountLoginComponent},
  {path: 'register', component: AccountRegisterComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
