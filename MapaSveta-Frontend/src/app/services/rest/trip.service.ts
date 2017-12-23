import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Trip} from "../../models/trips/trip";

@Injectable()
export class TripService extends RestService {
  private static HOST = `${environment.apiUrl}/trips`;

  constructor(http: Http) {
    super(http);
  }

  getTrip(tripId: number): Observable<Trip> {
    let options = RestService.options();
    return this.http.get(
      `${TripService.HOST}/${tripId}`,
      options
    ).map(res => res.json());
  }

  getTrips(): Observable<Trip[]> {
    let options = RestService.options();
    return this.http.get(
      `${TripService.HOST}/`,
      options
    ).map(res => res.json());
  }

  createTrip(trip: Trip): Observable<Trip> {
    if (!trip) {
      return;
    }
    let body = JSON.stringify(trip);
    console.log(body);
    let options = RestService.options();
    return this.http.post(
      `${TripService.HOST}/`,
      body,
      options
    ).map(res => res.json());
  }

  updateTrip(trip: Trip): Observable<Trip> {
    if (!trip) {
      return;
    }
    let body = JSON.stringify(trip);
    console.log(body);
    let options = RestService.options();
    return this.http.put(
      `${TripService.HOST}/${trip.id}`,
      body,
      options
    ).map(res => res.json());
  }

  deleteTrip(trip: Trip): Observable<boolean> {
    if (!trip) {
      return;
    }
    let options = RestService.options();
    return this.http.delete(
      `${TripService.HOST}/${trip.id}`,
      options
    ).map(res => res.json());
  }
}
