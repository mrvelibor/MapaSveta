import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './components/map-component/map.component';
import {AccountLoginComponent} from './components/account-login-component/account-login.component';
import {AccountRegisterComponent} from './components/account-register-component/account-register.component';
import {AccountEditorComponent} from "./components/account-editor-component/account-editor.component";
import {AuthGuard} from "./guards/auth.guard";
import {UserListComponent} from "./components/user-list-component/user-list.component";
import {AdminGuard} from "./guards/admin.guard";
import {TripListComponent} from "./components/trip-list-component/trip-list.component";
import {CountryListComponent} from "./components/country-list-component/country-list.component";
import {RecommendationListComponent} from "./components/recommendation-list-component/recommendation-list.component";

const appRoutes: Routes = [
  {path: '', component: MapComponent},
  {path: 'login', component: AccountLoginComponent},
  {path: 'register', component: AccountRegisterComponent},
  {path: 'account', component: AccountEditorComponent, canActivate: [AuthGuard]},
  {path: 'trips', component: TripListComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AdminGuard]},
  {path: 'countries', component: CountryListComponent},
  {path: 'recommendations', component: RecommendationListComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
