import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from './models/user/user';
import {AuthenticationService} from './services/rest/authentication.service';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {AlertService} from "./services/ui/alert/alert.service";
import {MapService, MapType} from "./components/map-component/map.service";
import {Country} from "./models/countries/country";
import {CountryService} from "./services/rest/country.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  currentUser: User;

  countries: Country[];
  countriesSubscription: Subscription;

  mapType: MapType;
  mapTypeSubscription: Subscription;

  routeSubscription: Subscription;

  url = environment.apiUrl;

  currentUrl: string;

  constructor(private authService: AuthenticationService,
              private countryService: CountryService,
              private alertService: AlertService,
              private mapService: MapService,
              private router: Router) {
    window['fbAsyncInit'] = function() {
      FB.init({
        appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v2.4'
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  ngOnInit() {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
      }
    });
    this.countriesSubscription = this.countryService.countries$.subscribe(
      countries => {
        this.countries = countries;
      }
    );
    this.mapTypeSubscription = this.mapService.mapType$.subscribe(
      mapType => {
        this.mapType = mapType;
      }
    );
    this.userSubscription = this.authService.user$.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
    this.mapTypeSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.alertService.success('Logged out!', this.currentUrl !== '/');
    this.router.navigate(['/']);
  }

  auth() {
    this.authService.auth().subscribe(
      data => {
        console.log(data);
      }
    );
  }

  setMapType(type: string) {
    this.mapService.setMapType(new MapType(type));
  }

  enableAdding() {
    this.mapService.setMapType(new MapType('recommendations', null, true));
    this.alertService.success('Kliknite na mapu da dodate zanimljivost.');
  }
}
