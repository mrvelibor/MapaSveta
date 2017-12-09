import {City} from './city';

export class Country {
  id: number;
  commonName: string;
  officialName: string;
  countryCode2: string;
  countryCode3: string;
  diallingCode: string;
  domain: string;
  capital: City;
  wikipediaUrl: string;
}
