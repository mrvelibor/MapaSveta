import {User} from "../user/user";
import {Recommendation} from "./recommendation";

export class RecommendationRating {
  id: number;
  recommendation: Recommendation;
  user: User;
  rating: number;
}
