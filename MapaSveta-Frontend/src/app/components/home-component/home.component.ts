import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from '../../models/user/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {MapService} from '../../services/rest/map.service';
import {Country} from '../../models/countries/country';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscription: Subscription;
  map;

  constructor(private authService: AuthenticationService,
              private mapService: MapService) {
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(
      user => {
        this.currentUser = user;
      }
    );

    let props = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), props);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCities() {
    this.mapService.getCities().subscribe(
      cities => {
        console.log(cities);
        if (cities) {
          cities.forEach(city => {
            let marker = new google.maps.Marker({
              position: city.location,
              map: this.map,
              title: city.name
            });
          });
        }
      }
    );
    this.loadCountries();
  }

  loadCountries() {
    this.mapService.getCountries().subscribe(
      countries => {
        console.log(countries);
        if (countries) {
          countries.forEach(country => {
            this.loadCountryMap(country);
          });
        }
      }
    );
  }

  loadCountryMap(country: Country) {
    this.mapService.getGeoJson(country).subscribe(
      geoJson => {
        console.log(geoJson);
        if (geoJson) {
          this.map.data.addGeoJson(geoJson);
        }
      }
    );
  }
}
