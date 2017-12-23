import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminGuard} from './guards/admin.guard';
import {AuthGuard} from './guards/auth.guard';
import {RestService} from './services/rest/rest.service';
import {AuthenticationService} from './services/rest/authentication.service';
import {AlertService} from './services/ui/alert/alert.service';
import {OverlayService} from './services/ui/overlay/overlay.service';
import {MapComponent} from './components/map-component/map.component';
import {LoginComponent} from './components/login-component/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing} from './app.routing';
import {AlertComponent} from './services/ui/alert/alert.component';
import {OverlayComponent} from './services/ui/overlay/overlay.component';
import {RegisterComponent} from './components/register-component/register.component';
import {MapaSvetaMaterialModule} from './mapa-sveta-material.module';
import {LoaderComponent} from './services/ui/loader/loader.component';
import {LoaderService} from './services/ui/loader/loader.service';
import {CityService} from "./services/rest/city.service";
import {CountryService} from "./services/rest/country.service";
import {RecommendationService} from "./services/rest/recommendation.service";
import {TripService} from "./services/rest/trip.service";
import {UserService} from "./services/rest/user.service";
import {CountryViewerComponent} from "./components/country-viewer-component/country-viewer.component";
import {RecommendationEditorComponent} from "./components/recommendation-editor-component/recommendation-editor.component";
import {RecommendationListComponent} from "./components/recommendation-list-component/recommendation-list.component";
import {RecommendationViewerComponent} from "./components/recommendation-viewer-component/recommendation-viewer.component";
import {TripEditorComponent} from "./components/trip-editor-component/trip-editor.component";
import {TripListComponent} from "./components/trip-list-component/trip-list.component";
import {UserListComponent} from "./components/user-list-component/user-list.component";

@NgModule({
  declarations: [
    AppComponent,
    CountryViewerComponent,
    LoginComponent,
    MapComponent,
    RecommendationEditorComponent,
    RecommendationListComponent,
    RecommendationViewerComponent,
    RegisterComponent,
    TripEditorComponent,
    TripListComponent,
    UserListComponent,
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
    CityService,
    CountryService,
    RecommendationService,
    TripService,
    UserService,
    AlertService,
    OverlayService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
