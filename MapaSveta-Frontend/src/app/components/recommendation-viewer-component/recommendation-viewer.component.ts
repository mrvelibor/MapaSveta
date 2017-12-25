import {Component, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../models/user/user";
import {AuthenticationService} from "../../services/rest/authentication.service";

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
    if (this.currentUser) {
      this.recommendationService.getRating(this.recommendation).subscribe(result => {
        if (result) {
          this.rating = result.rating;
        };
      });
    }
  }

  get recommendation() {
    return this._recommendation;
  }

  rating: number;

  constructor(private authService: AuthenticationService,
              private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  upvoteRecommendation() {
    this.recommendationService.upvoteRecommendation(this.recommendation).subscribe(result => {
      if (result) {
        this.rating = result.rating;
      };
    });
  }

  downvoteRecommendation() {
    this.recommendationService.downvoteRecommendation(this.recommendation).subscribe(result => {
      if (result) {
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
