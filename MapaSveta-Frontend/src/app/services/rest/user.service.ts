import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {User} from "../../models/user/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService extends RestService {
  private static HOST = `${environment.apiUrl}/users`;

  constructor(http: Http) {
    super(http);
  }

  getUsers(): Observable<User[]> {
    let options = RestService.options();
    return this.http.get(
      `${UserService.HOST}/`,
      options
    ).map(res => res.json());
  }

  updateUser(user: User): Observable<User> {
    if (!user) {
      return;
    }
    let body = JSON.stringify(user);
    console.log(body);
    let options = RestService.options();
    return this.http.put(
      `${UserService.HOST}/${user.id}`,
      body,
      options
    ).map(res => res.json());
  }

  deleteUser(user: User): Observable<boolean> {
    if (!user) {
      return;
    }
    let options = RestService.options();
    return this.http.delete(
      `${UserService.HOST}/${user.id}`,
      options
    ).map(res => res.json());
  }
}
