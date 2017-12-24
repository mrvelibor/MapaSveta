import {Injectable} from '@angular/core';
import {Country} from "../../models/countries/country";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class MapService {
  private _mapSource;
  private _mapType;
  mapType$;

  constructor() {
    this._mapSource = new BehaviorSubject<MapType>(new MapType('countries', null));
    this.mapType$ = this._mapSource.asObservable();
    this.mapType$.subscribe(u => this._mapType = u);
  }

  setMapType(mapType: MapType) {
    this._mapSource.next(mapType);
  }
}

export class MapType {
  type: string;
  country: Country;

  constructor(type: string, country: Country) {
    this.type = type;
    this.country = country;
  }
}
