import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {RestService} from './rest.service';
import {User} from '../../models/user/user';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthenticationService extends RestService {
  private static HOST = `${environment.apiUrl}/auth`;

  private _userSource;
  private _user;
  user$;

  constructor(http: Http) {
    super(http);
    let user = JSON.parse(localStorage.getItem('user'));
    this._userSource = new BehaviorSubject<User>(user);
    this.user$ = this._userSource.asObservable();
    this.user$.subscribe(u => this._user = u);
  }

  private handleResponse(res: Response): User {
    console.log(res);
    let userData = res.json();
    if (!userData) {
      return;
    }
    let user = userData.user;
    let token = userData.token;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this._userSource.next(user);
    return user;
  }

  auth(): Observable<string> {
    let options = RestService.options();
    return this.http.get(
      AuthenticationService.HOST,
      options
    ).map(res => res.text());
  }

  login(user: User): Observable<User> {
    let body = JSON.stringify(user);
    console.log(body);
    let options = RestService.options();
    return this.http.post(
      `${AuthenticationService.HOST}/login`,
      body,
      options
    ).map((res: Response) => {
      return this.handleResponse(res);
    });
  }

  register(user: User): Observable<User> {
    let body = JSON.stringify(user);
    console.log(body);
    let options = RestService.options();
    return this.http.post(
      `${AuthenticationService.HOST}/register`,
      body,
      options
    ).map((res: Response) => {
      return this.handleResponse(res);
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._userSource.next(null);
  }
}
