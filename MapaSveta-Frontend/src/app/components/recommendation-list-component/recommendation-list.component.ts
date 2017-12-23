import {Component} from "@angular/core";
import {RecommendationService} from "../../services/rest/recommendation.service";

@Component({
  templateUrl: 'recommendation-list.component.html',
  styleUrls: ['recommendation-list.component.scss']
})
export class RecommendationListComponent {
  constructor(private recommendationService: RecommendationService) {
  }
}
