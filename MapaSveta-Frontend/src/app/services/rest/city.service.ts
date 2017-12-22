import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {City} from "../../models/countries/city";

@Injectable()
export class CityService extends RestService {
  private static HOST = `${environment.apiUrl}/cities`;

  constructor(http: Http) {
    super(http);
  }

  getCities(): Observable<City[]> {
    let options = RestService.options();
    return this.http.get(
      `${CityService.HOST}/`,
      options
    ).map(res => res.json());
  }

}
