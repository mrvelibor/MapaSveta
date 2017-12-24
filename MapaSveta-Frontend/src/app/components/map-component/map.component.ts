import {AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {Country} from '../../models/countries/country';
import {CountryService} from "../../services/rest/country.service";
import {CityService} from "../../services/rest/city.service";
import {MatSidenav} from "@angular/material";
import {MapService, MapType} from "./map.service";
import {RecommendationService} from "../../services/rest/recommendation.service";

@Component({
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: User;
  userSubscription: Subscription;

  mapType: MapType;
  mapTypeSubscription: Subscription;

  @ViewChild('drawer')
  sidenav: MatSidenav;

  map;


  countries: Country[];

  country: Country;

  constructor(private _ngZone: NgZone,
              private mapService: MapService,
              private authService: AuthenticationService,
              private countryService: CountryService,
              private cityService: CityService,
              private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    this.mapTypeSubscription = this.mapService.mapType$.subscribe(
      mapType => {
        this.mapType = mapType;
        this.onMapTypeChanged();
      }
    );

    this.loadCountries();
    this.loadCities();
  }

  ngAfterViewInit() {
    let styledMapType = new google.maps.StyledMapType([
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]);
    let props = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'styled_map']
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), props);
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');

    this.map.data.addListener('click', (event) => {
      console.log(event);
      if (event.feature.f.cca2) {
        this.country = this.countries.find(country => country.countryCode2.toUpperCase() === event.feature.f.cca2.toUpperCase());
        if (this.country) {
          this._ngZone.run(() => {
            this.sidenav.open();
          });
        }
      }
    });

    this.loadMaps('size_3');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onMapTypeChanged() {
    console.log(this.mapType);
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(
      countries => {
        console.log(countries);
        this.countries = countries;
      }
    );
  }

  loadMaps(size: string) {
    this.map.data.forEach(feature => {
      this.map.data.remove(feature);
    });
    this.countryService.getMaps(size).subscribe(
      maps => {
        console.log(maps);
        if (maps) {
          maps.forEach(
            map => {
              let country = this.countries.find(c => c.countryCode3 === map.countryCode3);
              if (country) {
                if (!country.maps) {
                  country.maps = [];
                }
                country.maps[size] = map.geoJson;
              }
              this.map.data.addGeoJson(map.geoJson);
            }
          );
        }
        google.maps.event.trigger(this.map, "resize");
      }
    );
  }

  loadCities() {
    this.cityService.getCities().subscribe(
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
  }

  loadRecommendations() {
    this.recommendationService.getRecommendations().subscribe(
      recommendations => {
        console.log(recommendations);
        if (recommendations) {
          recommendations.forEach(recommendation => {
            let marker = new google.maps.Marker({
              position: recommendation.location,
              map: this.map,
              title: recommendation.name
            });
          });
        }
      }
    );
  }

  // this.map.data.forEach(feature => {
  //   this.map.data.remove(feature);
  // });
  // this.map.data.addListener('addfeature', (event) => {
  //   if (event.feature.f.cca3 === 'SRB') {
  //     this.map.data.overrideStyle(event.feature, {fillColor: 'blue'});
  //   } else if (event.feature.f.cca2 === 'gr' ||
  //     event.feature.f.cca2 === 'ru' ||
  //     event.feature.f.cca2 === 'ba' ||
  //     event.feature.f.cca2 === 'me' ||
  //     event.feature.f.cca2 === 'tr' ||
  //     event.feature.f.cca2 === 'it' ||
  //     event.feature.f.cca2 === 'fr' ||
  //     event.feature.f.cca2 === 'us' ||
  //     event.feature.f.cca2 === 'eg' ||
  //     event.feature.f.cca2 === 'at' ||
  //     event.feature.f.cca2 === 'hu' ||
  //     event.feature.f.cca2 === 'mk' ||
  //     event.feature.f.cca2 === 'cz' ||
  //     event.feature.f.cca2 === 'ee' ||
  //     event.feature.f.cca2 === 'nl' ||
  //     event.feature.f.cca2 === 'pl' ||
  //     event.feature.f.cca2 === 'es'
  //   ) {
  //     this.map.data.overrideStyle(event.feature, {fillColor: 'green'});
  //   } else if (event.feature.f.cca2 === 'de' ||
  //     event.feature.f.cca2 === 'gb' ||
  //     event.feature.f.cca2 === 'il' ||
  //     event.feature.f.cca2 === 'sa' ||
  //     event.feature.f.cca2 === 'bg' ||
  //     event.feature.f.cca2 === 'al' ||
  //     event.feature.f.cca2 === 'se'
  //   ) {
  //     this.map.data.overrideStyle(event.feature, {fillColor: 'yellow'});
  //   }
  // });
  //   this.map.data.addListener('addfeature', (event) => {
  //   if (event.feature.f.cca3 === 'SRB') {
  //   this.map.data.overrideStyle(event.feature, {fillColor: 'blue'});
  // } else {
  //   let country = this.visa.requirements[event.feature.f.csvc];
  //   if (country) {
  //     switch (country.permission) {
  //       case 'free':
  //         this.map.data.overrideStyle(event.feature, {fillColor: 'green'});
  //         break;
  //       case 'arrival':
  //         this.map.data.overrideStyle(event.feature, {fillColor: 'yellow'});
  //         break;
  //       case 'required':
  //         this.map.data.overrideStyle(event.feature, {fillColor: 'red'});
  //         break;
  //     }
  //   }
  // }
  // });
  // this.map.data.addListener('click', (event) => {
  //   if (event.feature.f.a) {
  //     this.map.data.overrideStyle(event.feature, {fillColor: 'yellow'});
  //     event.feature.f.a = false;
  //   } else {
  //     this.map.data.overrideStyle(event.feature, {fillColor: 'green'});
  //     event.feature.f.a = true;
  //   }
  // });
}
