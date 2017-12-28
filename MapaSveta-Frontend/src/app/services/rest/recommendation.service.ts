import {RestService} from './rest.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Recommendation} from "../../models/recommendations/recommendation";
import {Country} from "../../models/countries/country";
import {User} from "../../models/user/user";
import {RecommendationRating} from "../../models/recommendations/recommendation-rating";
import {RecommendationRatingCount} from "../../models/recommendations/recommendation-rating-count";

@Injectable()
export class RecommendationService extends RestService {
  private static HOST = `${environment.apiUrl}/recommendations`;

  constructor(http: Http) {
    super(http);
  }

  getRecommendation(recommendationId: number): Observable<Recommendation> {
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/${recommendationId}`,
      options
    ).map(res => res.json());
  }

  getRecommendations(): Observable<Recommendation[]> {
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/`,
      options
    ).map(res => res.json());
  }

  createRecommendation(recommendation: Recommendation): Observable<Recommendation> {
    if (!recommendation) {
      return;
    }
    let body = JSON.stringify(recommendation);
    console.log(body);
    let options = RestService.options();
    return this.http.post(
      `${RecommendationService.HOST}/`,
      body,
      options
    ).map(res => res.json());
  }

  deleteRecommendation(recommendation: Recommendation): Observable<boolean> {
    if (!recommendation) {
      return;
    }
    let options = RestService.options();
    return this.http.delete(
      `${RecommendationService.HOST}/${recommendation.id}`,
      options
    ).map(res => res.json());
  }

  getRecommendationsForUser(user: User): Observable<Recommendation[]> {
    if (!user) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/by_user/${user.id}`,
      options
    ).map(res => res.json());
  }

  getRecommendationsForCountry(country: Country): Observable<Recommendation[]> {
    if (!country) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/by_country/${country.id}`,
      options
    ).map(res => res.json());
  }

  getRecommendationRatings(recommendation: Recommendation): Observable<RecommendationRating[]> {
    if (!recommendation) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/${recommendation.id}/ratings`,
      options
    ).map(res => res.json());
  }

  getRecommendationRatingCount(recommendation: Recommendation): Observable<RecommendationRatingCount> {
    if (!recommendation) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/${recommendation.id}/rating_count`,
      options
    ).map(res => res.json());
  }

  getRating(recommendation: Recommendation): Observable<RecommendationRating> {
    if (!recommendation) {
      return;
    }
    let options = RestService.options();
    return this.http.get(
      `${RecommendationService.HOST}/${recommendation.id}/rating`,
      options
    ).map(res => res.json());
  }

  upvoteRecommendation(recommendation: Recommendation): Observable<RecommendationRating> {
    if (!recommendation) {
      return;
    }
    let options = RestService.options();
    return this.http.post(
      `${RecommendationService.HOST}/${recommendation.id}/upvote`,
      "",
      options
    ).map(res => res.json());
  }

  downvoteRecommendation(recommendation: Recommendation): Observable<RecommendationRating> {
    if (!recommendation) {
      return;
    }
    let options = RestService.options();
    return this.http.post(
      `${RecommendationService.HOST}/${recommendation.id}/downvote`,
      "",
      options
    ).map(res => res.json());
  }
}
