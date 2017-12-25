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
import {AccountLoginComponent} from './components/account-login-component/account-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing} from './app.routing';
import {AlertComponent} from './services/ui/alert/alert.component';
import {OverlayComponent} from './services/ui/overlay/overlay.component';
import {AccountRegisterComponent} from './components/account-register-component/account-register.component';
import {MapaSvetaMaterialModule} from './mapa-sveta-material.module';
import {LoaderComponent} from './services/ui/loader/loader.component';
import {LoaderService} from './services/ui/loader/loader.service';
import {CityService} from "./services/rest/city.service";
import {CountryService} from "./services/rest/country.service";
import {RecommendationService} from "./services/rest/recommendation.service";
import {TripService} from "./services/rest/trip.service";
import {UserService} from "./services/rest/user.service";
import {
  CountryViewerComponent,
  CountryViewerDialog
} from "./components/country-viewer-component/country-viewer.component";
import {
  RecommendationEditorComponent,
  RecommendationEditorDialog
} from "./components/recommendation-editor-component/recommendation-editor.component";
import {RecommendationListComponent} from "./components/recommendation-list-component/recommendation-list.component";
import {
  RecommendationViewerComponent,
  RecommendationViewerDialog
} from "./components/recommendation-viewer-component/recommendation-viewer.component";
import {TripEditorComponent, TripEditorDialog} from "./components/trip-editor-component/trip-editor.component";
import {TripListComponent} from "./components/trip-list-component/trip-list.component";
import {UserListComponent} from "./components/user-list-component/user-list.component";
import {AccountEditorComponent} from "./components/account-editor-component/account-editor.component";
import {CountryListComponent} from "./components/country-list-component/country-list.component";
import {TripViewerComponent} from "./components/trip-viewer-component/trip-viewer.component";
import {UserEditorComponent, UserEditorDialog} from "./components/user-editor-component/user-editor.component";
import {UserViewerComponent, UserViewerDialog} from "./components/user-viewer-component/user-viewer.component";
import {NospaceValidator} from "./directives/nospace.validator";
import {IsObjectValidator} from "./directives/is-object.validator";
import {ConfirmationDialog} from "./components/confirmation-dialog/confirmation.dialog";
import {MapService} from "./components/map-component/map.service";

@NgModule({
  declarations: [
    AppComponent,
    AccountEditorComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
    ConfirmationDialog,
    CountryListComponent,
    CountryViewerComponent,
    CountryViewerDialog,
    MapComponent,
    RecommendationEditorComponent,
    RecommendationEditorDialog,
    RecommendationListComponent,
    RecommendationViewerComponent,
    RecommendationViewerDialog,
    TripEditorComponent,
    TripEditorDialog,
    TripListComponent,
    TripViewerComponent,
    UserEditorComponent,
    UserEditorDialog,
    UserListComponent,
    UserViewerComponent,
    UserViewerDialog,
    AlertComponent,
    OverlayComponent,
    LoaderComponent,
    IsObjectValidator,
    NospaceValidator
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
    MapService,
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
  entryComponents: [
    ConfirmationDialog,
    CountryViewerDialog,
    RecommendationEditorDialog,
    RecommendationViewerDialog,
    TripEditorDialog,
    UserEditorDialog,
    UserViewerDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
