import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Country} from '../../models/countries/country';
import {Observable} from "rxjs/Observable";
import {VisaRequirement} from "../../models/countries/visa-requirement";
import {CountryMap} from "../../models/countries/country-map";

@Injectable()
export class CountryService extends RestService {
  private static HOST = `${environment.apiUrl}/countries`;

  constructor(http: Http) {
    super(http);
  }

  getCountries(): Observable<Country[]> {
    let options = RestService.options();
    return this.http.get(
      `${CountryService.HOST}/`,
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

  getGeoJson(country: Country, size: string) {
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
