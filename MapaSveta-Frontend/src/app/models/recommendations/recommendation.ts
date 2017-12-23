import {LatLng} from '../common/lat-lng';
import {User} from "../user/user";
import {Address} from "../common/address";

export class Recommendation {
  id: number;
  name: string;
  description: string;
  location: LatLng;
  address: Address;
  phoneNumber: string;
  imageUrl: string;
  createdBy: User;
}
