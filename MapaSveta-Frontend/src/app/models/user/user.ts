import {Country} from "../countries/country";
import {Language} from "../common/language";

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  country: Country;
  avatarUrl: string;
  languages: Language[];
  type: string;
}
