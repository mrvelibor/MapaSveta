import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

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

  getCities() {
    let options = RestService.options();
    return this.http.get(
      `${MapService.HOST}/cities`,
      options
    ).map(res => res.json());
  }
}
