import {Component, Input} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";

@Component({
  selector: 'app-recommendation-viewer',
  templateUrl: 'recommendation-viewer.component.html',
  styleUrls: ['recommendation-viewer.component.scss']
})
export class RecommendationViewerComponent {

  @Input('recommendation')
  recommendation: Recommendation;

  constructor(private recommendationService: RecommendationService) {
  }
}
