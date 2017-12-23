import {City} from './city';
import {Currency} from "../common/currency";
import {Language} from "../common/language";

export class Country {
  id: number;
  commonName: string;
  officialName: string;
  nativeNames: string[];
  serbianName: string;
  countryCode2: string;
  countryCode3: string;
  visaCode: string;
  diallingCode: string;
  domain: string;
  capital: City;
  wikipediaUrl: string;
  currencies: Currency[];
  languages: Language[];
  flagUrl: string;
  maps: object[];
}
