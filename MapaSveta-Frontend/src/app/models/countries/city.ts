import {Country} from './country';
import {LatLng} from '../commons/lat-lng';

export class City {
  id: number;
  zipCode: string;
  name: string;
  country: Country;
  location: LatLng;
}
