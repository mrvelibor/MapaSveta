import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Country} from '../../models/countries/country';

@Injectable()
export class MapService extends RestService {
  private static HOST = `${environment.apiUrl}`;

  constructor(http: Http) {
    super(http);
  }

  getCountries() {
    let options = RestService.options();
    return this.http.get(
      `${MapService.HOST}/countries`,
      options
    ).map(res => res.json());
  }

  getMaps(size: string) {
    if (!size) {
      size = 'original';
    }
    let options = RestService.options();
    return this.http.get(
      `${MapService.HOST}/maps/${size}`,
      options
    ).map(res => res.json());
  }

  getGeoJson(country: Country, size: string) {
    if (!size) {
      size = 'original';
    }
    let options = RestService.options();
    return this.http.get(
      `${MapService.HOST}/res/country_maps/${size}/${country.countryCode3.toLowerCase()}.geo.json`,
      options
    ).map(res => res.json());
  }

  getFlag(country: Country) {
    let options = RestService.options();
    return this.http.get(
      `${MapService.HOST}/res/country_flags/${country.countryCode3.toLowerCase()}.svg`,
      options
    ).map(res => res.json());
  }

  getCities() {
    let options = RestService.options();
    return this.http.get(
      `${MapService.HOST}/cities`,
      options
    ).map(res => res.json());
  }
}
