import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Country} from '../../models/countries/country';
import {Observable} from "rxjs/Observable";
import {VisaRequirement} from "../../models/countries/visa-requirement";
import {CountryMap} from "../../models/countries/country-map";
import {VisaPermissionCountry} from "../../models/countries/visa-permission";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CountryService extends RestService {
  private static HOST = `${environment.apiUrl}/countries`;

  private _countriesSource;
  private countries;
  countries$;

  constructor(http: Http) {
    super(http);
    this._countriesSource = new BehaviorSubject<Country[]>([]);
    this.countries$ = this._countriesSource.asObservable();
    this.countries$.subscribe(u => this.countries = u);
    this.getCountries().subscribe(countries => this._countriesSource.next(countries));
  }

  getCountries(): Observable<Country[]> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/`,
      options
    ).map(res => res.json());
  }

  getCountry(countryId: number): Observable<Country> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/${countryId}`,
      options
    ).map(res => res.json());
  }

  getCountryTripCount(countryId: number): Observable<number> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/${countryId}/trip_count`,
      options
    ).map(res => res.json());
  }

  getCountryRecommendationCount(countryId: number): Observable<number> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/${countryId}/recommendation_count`,
      options
    ).map(res => res.json());
  }

  getVisitedCountries(): Observable<Country[]> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/visited`,
      options
    ).map(res => res.json());
  }

  getWishlistCountries(): Observable<Country[]> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/wishlist`,
      options
    ).map(res => res.json());
  }

  isInWishlist(country: Country): Observable<boolean> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/wishlist/${country.id}`,
      options
    ).map(res => res.json());
  }

  addToWishlist(country: Country): Observable<boolean> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.post(
      `${CountryService.HOST}/wishlist/${country.id}`,
      '',
      options
    ).map(res => res.json());
  }

  removeFromWishlist(country: Country): Observable<boolean> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.delete(
      `${CountryService.HOST}/wishlist/${country.id}`,
      options
    ).map(res => res.json());
  }

  getMaps(size: string): Observable<CountryMap[]> {
    if (!size) {
      size = 'original';
    }
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/maps/${size}`,
      options
    ).map(res => res.json());
  }

  getVisaPolicy(country: Country): Observable<VisaRequirement> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/${country.id}/visa_policy`,
      options
    ).map(res => res.json());
  }

  getVisaRequirements(country: Country): Observable<VisaRequirement> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/${country.id}/visa_requirements`,
      options
    ).map(res => res.json());
  }

  getVisaPermission(country: Country): Observable<VisaPermissionCountry> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${environment.apiUrl}/res/country_visas/${country.visaCode}.visas.json`,
      options
    ).map(res => res.json());
  }

  getGeoJson(country: Country, size: string) {
    if (!country) {
      return;
    }
    if (!size) {
      size = 'original';
    }
    let options = RestService.options();
    return this.http.get(
      `${environment.apiUrl}/res/country_maps/${size}/${country.countryCode3.toLowerCase()}.geo.json`,
      options
    ).map(res => res.json());
  }
}
