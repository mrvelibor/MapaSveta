import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AdminGuard} from './guards/admin.guard';
import {AuthGuard} from './guards/auth.guard';
import {RestService} from './services/rest/rest.service';
import {AuthenticationService} from './services/rest/authentication.service';
import {AlertService} from './services/alert/alert.service';
import {OverlayService} from './services/overlay/overlay.service';
import {HomeComponent} from './components/home-component/home.component';
import {LoginComponent} from './components/login-component/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing} from './app.routing';
import {AlertComponent} from './services/alert/alert.component';
import {OverlayComponent} from './services/overlay/overlay.component';
import {RegisterComponent} from './components/register-component/register.component';
import {MapaSvetaMaterialModule} from './mapa-sveta-material.module';
import {LoaderComponent} from './services/loader/loader.component';
import {LoaderService} from './services/loader/loader.service';
import {MapService} from './services/rest/map.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    OverlayComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MapaSvetaMaterialModule
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    RestService,
    AuthenticationService,
    MapService,
    AlertService,
    OverlayService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
