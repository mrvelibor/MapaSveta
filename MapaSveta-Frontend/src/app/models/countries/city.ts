import {Country} from './country';
import {LatLng} from '../commons/lat-lng';

export class City {
  id: number;
  name: string;
  country: Country;
  location: LatLng;
}
