import {Country} from './country';
import {LatLng} from './lat-lng';

export class City {
  id: number;
  name: string;
  country: Country;
  location: LatLng;
}
