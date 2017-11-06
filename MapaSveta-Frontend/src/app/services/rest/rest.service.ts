import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {

  constructor(protected http: Http) {
  }

  protected static options() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    return new RequestOptions({headers: headers, withCredentials: token != null});
  }

}
