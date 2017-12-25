import {AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {Country} from '../../models/countries/country';
import {CountryService} from "../../services/rest/country.service";
import {CityService} from "../../services/rest/city.service";
import {MatDialog, MatSidenav} from "@angular/material";
import {MapService, MapType} from "./map.service";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationEditorDialog} from "../recommendation-editor-component/recommendation-editor.component";
import {LatLng} from "../../models/common/lat-lng";
import {Address} from "../../models/common/address";
import {AlertService} from "../../services/ui/alert/alert.service";

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

  recommendationsSubscription: Subscription;
  visasSubscription: Subscription;

  map;
  mapMarkers = [];
  mapLoaded = false;

  @ViewChild('drawer')
  sidenav: MatSidenav;

  selectedCountry: Country;
  selectedRecommendation: Recommendation;

  constructor(private _ngZone: NgZone,
              private mapService: MapService,
              private authService: AuthenticationService,
              private countryService: CountryService,
              private cityService: CityService,
              private recommendationService: RecommendationService,
              private alertService: AlertService,
              private dialog: MatDialog) {
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
        this.setupMap();
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
      if (event.feature.f.cca2) {
        let country = this.countries.find(country => country.countryCode2.toUpperCase() === event.feature.f.cca2.toUpperCase());
        if (country) {
          this._ngZone.run(() => {
            this.countryClicked(country, event.latLng);
          });
        }
      }
    });
    this.loadMaps('size_3');
  }

  lastMapType: string;

  setupMap() {
    if (!this.mapLoaded || this.mapType.type === this.lastMapType) {
      return;
    }
    this.alertService.clearMessage();
    this.lastMapType = this.mapType.type;

    if (this.recommendationsSubscription) {
      this.recommendationsSubscription.unsubscribe();
    }
    if (this.visasSubscription) {
      this.visasSubscription.unsubscribe();
    }
    this.mapMarkers.forEach(marker => marker.setMap(null));
    this.mapMarkers = [];
    this.sidenav.close();
    switch (this.mapType.type) {
      case 'countries':
        this.map.setMapTypeId('styled_map');
        this.map.data.forEach(feature => {
          this.map.data.overrideStyle(feature, {fillColor: 'gray'});
        });
        break;
      case 'recommendations':
        this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        this.map.data.forEach(feature => {
          this.map.data.overrideStyle(feature, {fillColor: 'transparent'});
        });
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
        this.mapLoaded = true;
        this.setupMap();
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
    this.recommendationsSubscription = this.recommendationService.getRecommendations().subscribe(
      recommendations => {
        console.log(recommendations);
        recommendations.forEach(recommendation => {
          this.addRecommendationMarker(recommendation);
        });
      }
    );
  }

  addRecommendationMarker(recommendation: Recommendation) {
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
    this.mapMarkers.push(marker);
  }

  loadVisas(country: Country) {
    console.log(country.visaCode);
    this.visasSubscription = this.countryService.getVisaPermission(country).subscribe(
      visaPolicy => {
        if (visaPolicy.csvc === 'SERB') {
          visaPolicy.requirements['URUG'].permission = 'free';
          visaPolicy.requirements['BRAZ'].permission = 'free';
          visaPolicy.requirements['MAUR'].permission = 'free';
          visaPolicy.requirements['GAMB'].permission = 'free';
          visaPolicy.requirements['TOGO'].permission = 'free';
          visaPolicy.requirements['ZMBI'].permission = 'free';
          visaPolicy.requirements['IRAN'].permission = 'free';
          visaPolicy.requirements['GEOR'].permission = 'free';
          visaPolicy.requirements['MONG'].permission = 'free';
          visaPolicy.requirements['JAPA'].permission = 'free';
          visaPolicy.requirements['INDO'].permission = 'free';
          visaPolicy.requirements['INDI'].permission = 'electronic';
          visaPolicy.requirements['MYAN'].permission = 'electronic';
          visaPolicy.requirements['ZIMB'].permission = 'electronic';
          visaPolicy.requirements['IVOR'].permission = 'electronic';
          visaPolicy.requirements['HOND'].permission = 'electronic';
          visaPolicy.requirements['DOMR'].permission = 'electronic';
          visaPolicy.requirements['LESO'].permission = 'electronic';
          visaPolicy.requirements['SWAZ'].permission = 'electronic';
          visaPolicy.requirements['OMAN'].permission = 'arrival';
          visaPolicy.requirements['MAUR'].permission = 'arrival';
          visaPolicy.requirements['SIER'].permission = 'arrival';
          visaPolicy.requirements['GABO'].permission = 'arrival';
          visaPolicy.requirements['UGAN'].permission = 'arrival';
          visaPolicy.requirements['KENY'].permission = 'arrival';
          visaPolicy.requirements['SENE'].permission = 'required';
        }
        if (visaPolicy.csvc === 'SERB' || visaPolicy.csvc === 'BOSN' || visaPolicy.csvc === 'MACE' || visaPolicy.csvc === 'MONT') {
          visaPolicy.requirements['PRTG'].permission = 'free';
          visaPolicy.requirements['ESPA'].permission = 'free';
          visaPolicy.requirements['FRAN'].permission = 'free';
          visaPolicy.requirements['FRAN'].permission = 'free';
          visaPolicy.requirements['SLOV'].permission = 'free';
          visaPolicy.requirements['CROA'].permission = 'free';
          visaPolicy.requirements['ITAL'].permission = 'free';
          visaPolicy.requirements['SWTZ'].permission = 'free';
          visaPolicy.requirements['LUXE'].permission = 'free';
          visaPolicy.requirements['BELG'].permission = 'free';
          visaPolicy.requirements['NETH'].permission = 'free';
          visaPolicy.requirements['DEUT'].permission = 'free';
          visaPolicy.requirements['OSTE'].permission = 'free';
          visaPolicy.requirements['GRCE'].permission = 'free';
          visaPolicy.requirements['BULG'].permission = 'free';
          visaPolicy.requirements['TURK'].permission = 'free';
          visaPolicy.requirements['ROMA'].permission = 'free';
          visaPolicy.requirements['HUNG'].permission = 'free';
          visaPolicy.requirements['SVKI'].permission = 'free';
          visaPolicy.requirements['CZEC'].permission = 'free';
          visaPolicy.requirements['POLA'].permission = 'free';
          visaPolicy.requirements['UKRA'].permission = 'free';
          visaPolicy.requirements['MOLD'].permission = 'free';
          visaPolicy.requirements['BELA'].permission = 'free';
          visaPolicy.requirements['LITH'].permission = 'free';
          visaPolicy.requirements['LATV'].permission = 'free';
          visaPolicy.requirements['ESTO'].permission = 'free';
          visaPolicy.requirements['SWED'].permission = 'free';
          visaPolicy.requirements['FINL'].permission = 'free';
          visaPolicy.requirements['NORW'].permission = 'free';
          visaPolicy.requirements['ICEL'].permission = 'free';
          visaPolicy.requirements['GRNL'].permission = 'free';
          console.log(JSON.stringify(visaPolicy));
        }
        //console.log(visaPolicy);
        this.map.data.forEach(feature => {
          let requirement = visaPolicy.requirements[feature.f.visaCode];
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
        });
      }
    );
  }

  countryClicked(country: Country, latLng) {
    switch (this.mapType.type) {
      case 'countries':
        this.selectedRecommendation = null;
        this.selectedCountry = country;
        this.sidenav.open();
        break;
      case 'recommendations':
        if (this.mapType.shouldAdd) {
          let recommendation = new Recommendation();
          recommendation.location = new LatLng(latLng.lat(), latLng.lng());
          recommendation.address = new Address();
          recommendation.address.country = country;
          let dialogRef = this.dialog.open(RecommendationEditorDialog, {
            data: recommendation
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.addRecommendationMarker(result);
            }
            this.mapType.shouldAdd = false;
            this.alertService.clearMessage();
          });
        }
        break;
      case 'visas':
        this.loadVisas(country);
        break;
    }
  }

  recommendationClicked(recommendation: Recommendation) {
    this.selectedCountry = null;
    this.selectedRecommendation = recommendation;
    this.sidenav.open();
  }
}
