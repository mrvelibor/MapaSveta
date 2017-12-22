import {User} from "../user/user";
import {Country} from "../countries/country";
import {City} from "../countries/city";

export class Trip {
  id: number;
  user: User;
  country: Country;
  city: City;
  dateFrom: string;
  dateTo: string;
  details: string;
}
