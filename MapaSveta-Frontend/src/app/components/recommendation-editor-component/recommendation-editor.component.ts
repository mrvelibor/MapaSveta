import {Component, Input} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";

@Component({
  selector: 'app-recommendation-edtior',
  templateUrl: 'recommendation-editor.component.html',
  styleUrls: ['recommendation-editor.component.scss']
})
export class RecommendationEditorComponent {

  @Input('recommendation')
  recommendation: Recommendation;

  constructor(private recommendationService: RecommendationService) {
  }
}
