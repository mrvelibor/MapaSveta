import {Component, Inject, Input} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-recommendation-viewer',
  templateUrl: 'recommendation-viewer.component.html',
  styleUrls: ['recommendation-viewer.component.scss']
})
export class RecommendationViewerComponent {

  apiUrl = environment.apiUrl;

  @Input('recommendation')
  recommendation: Recommendation;

  constructor(private recommendationService: RecommendationService) {
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
