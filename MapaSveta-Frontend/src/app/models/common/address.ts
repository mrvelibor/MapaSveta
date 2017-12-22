import {City} from "../countries/city";
import {Country} from "../countries/country";

export class Address {
  zipCode: string;
  street: string;
  cityName: string;
  city: City;
  country: Country;
}
