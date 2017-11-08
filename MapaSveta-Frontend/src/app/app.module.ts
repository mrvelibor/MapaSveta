import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AdminGuard} from './guards/admin.guard';
import {AuthGuard} from './guards/auth.guard';
import {RestService} from './services/rest/rest.service';
import {AuthenticationService} from './services/rest/authentication.service';
import {AlertService} from './services/alert.service';
import {OverlayService} from './services/overlay.service';
import {HomeComponent} from './components/home-component/home.component';
import {LoginComponent} from './components/login-component/login.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing} from './app.routing';
import {AlertComponent} from './directives/alert.component';
import {OverlayComponent} from './directives/overlay.component';
import {RegisterComponent} from './components/register-component/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    RestService,
    AuthenticationService,
    AlertService,
    OverlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
