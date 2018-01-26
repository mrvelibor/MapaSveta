import {Component, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../models/user/user";
import {AuthenticationService} from "../../services/rest/authentication.service";
import {RecommendationRatingCount} from "../../models/recommendations/recommendation-rating-count";

@Component({
  selector: 'app-recommendation-viewer',
  templateUrl: 'recommendation-viewer.component.html',
  styleUrls: ['recommendation-viewer.component.scss']
})
export class RecommendationViewerComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;

  userSubscription: Subscription;
  currentUser: User;

  _recommendation: Recommendation;

  @Input('recommendation')
  set recommendation(value: Recommendation) {
    this._recommendation = value;
    this.rating = 0;
    this.ratingCount = new RecommendationRatingCount();
    this.recommendationService.getRecommendationRatingCount(this.recommendation).subscribe(result => {
      if (result) {
        this.ratingCount = result;
      };
    });
    this.loadRecommendationRating();
  }

  get recommendation() {
    return this._recommendation;
  }

  rating: number;
  ratingCount: RecommendationRatingCount;

  constructor(private authService: AuthenticationService,
              private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
      this.loadRecommendationRating();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  loadRecommendationRating() {
    if (this.currentUser) {
      this.recommendationService.getRating(this.recommendation).subscribe(result => {
        console.log(result);
        if (result) {
          this.rating = result.rating;
        };
      });
    }
  }

  upvoteRecommendation() {
    this.recommendationService.upvoteRecommendation(this.recommendation).subscribe(result => {
      if (result) {
        this.ratingCount.upvotes += result.rating - this.rating;
        this.rating = result.rating;
      };
    });
  }

  downvoteRecommendation() {
    this.recommendationService.downvoteRecommendation(this.recommendation).subscribe(result => {
      if (result) {
        this.ratingCount.downvotes += -result.rating - this.rating;
        this.rating = result.rating;
      };
    });
  }
}

@Component({
  selector: 'dialog-recommendation-viewer',
  templateUrl: 'recommendation-viewer.dialog.html'
})
export class RecommendationViewerDialog {
  constructor(public dialogRef: MatDialogRef<RecommendationViewerDialog>,
              @Inject(MAT_DIALOG_DATA) public recommendation: Recommendation) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
