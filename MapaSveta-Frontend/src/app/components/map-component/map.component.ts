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
import {Recommendation} from "../../models/recommendations/recommendation";

@Component({
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: User;
  userSubscription: Subscription;

  mapType: MapType;
  mapTypeSubscription: Subscription;

  countries: Country[];
  countriesSubscription: Subscription;

  map;
  mapLoaded: boolean;

  @ViewChild('drawer')
  sidenav: MatSidenav;

  selectedCountry: Country;
  selectedRecommendation: Recommendation;

  constructor(private _ngZone: NgZone,
              private mapService: MapService,
              private authService: AuthenticationService,
              private countryService: CountryService,
              private cityService: CityService,
              private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.mapLoaded = false;
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
    this.countriesSubscription = this.countryService.countries$.subscribe(
      countries => {
        this.countries = countries;
      }
    );
    this.loadCities();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    this.countriesSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.mapTypeSubscription.unsubscribe();
  }

  initMap() {
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
      console.log(event.latLng);
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      if (event.feature.f.cca2) {
        let country = this.countries.find(country => country.countryCode2.toUpperCase() === event.feature.f.cca2.toUpperCase());
        if (country) {
          this._ngZone.run(() => {
            this.countryClicked(country);
          });
        }
      }
    });
    this.setupMap();

    this.loadMaps('size_3');
  }

  setupMap() {
    if (!this.mapLoaded) {
      return;
    }
    switch (this.mapType.type) {
      case 'countries':
        this.map.setMapTypeId('styled_map');
        break;
      case 'recommendations':
        this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        this.loadRecommendations();
        break;
      case 'visas':
        this.map.setMapTypeId('styled_map');
        let country = this.mapType.country;
        if (!country) {
          if (this.currentUser && this.currentUser.country) {
            country = this.currentUser.country;
          } else {
            country = this.countries.find(c => c.countryCode2.toLowerCase() === 'rs');
          }
        }
        this.loadVisas(country);
        break;
    }
  }

  onMapTypeChanged() {
    this.setupMap();
  }

  loadMaps(size: string) {
    this.map.data.forEach(feature => {
      this.map.data.remove(feature);
    });
    this.countryService.getMaps(size).subscribe(
      maps => {
        console.log(maps);
        if (maps) {
          maps.filter(map => map.geoJson).forEach(
            map => {
              let country = this.countries.find(c => c.countryCode3 === map.countryCode3);
              if (country) {
                if (!country.maps) {
                  country.maps = [];
                }
                country.maps[size] = map.geoJson;
                let features = map.geoJson['features'];
                if (features) {
                  features.forEach(feature => feature.properties.visaCode = country.visaCode);
                }
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
            marker.addListener('click', (event) => {
              this._ngZone.run(() => {
                this.recommendationClicked(recommendation);
              });
            });
          });
        }
      }
    );
  }

  loadVisas(country: Country) {
    this.countryService.getVisaPermission(country).subscribe(
      data => {
        this.map.data.forEach(feature => {
          let requirement = data.requirements[feature.f.visaCode];
          let color = 'gray';
          if (requirement) switch (requirement.permission) {
            case "free":
            case "union":
              color = 'green';
              break;
            case "arrival":
              color = 'yellow';
              break;
            case "electronic":
              color = 'yellow';
              break;
            case "required":
              color = 'red';
              break;
          } else {
            if (feature.f.visaCode === country.visaCode) {
              color = 'blue';
            }
          }
          this.map.data.overrideStyle(feature, {fillColor: color});
        })
      }
    );
  }

  countryClicked(country: Country) {
    this.selectedRecommendation = null;
    this.selectedCountry = country;
    this.sidenav.open();
  }

  recommendationClicked(recommendation: Recommendation) {
    this.selectedCountry = null;
    this.selectedRecommendation = recommendation;
    this.sidenav.open();
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
