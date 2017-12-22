import {Country} from './country';
import {LatLng} from '../common/lat-lng';

export class City {
  id: number;
  zipCode: string;
  name: string;
  country: Country;
  location: LatLng;
}
