import {Country} from "./country";

export class VisaRequirement {
  id: number;
  fromCountry: Country;
  toCountry: Country;
  requirement: string;
  lengthOfStay: number;
  notes: string;
}
