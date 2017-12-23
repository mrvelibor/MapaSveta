import {Component} from "@angular/core";
import {TripService} from "../../services/rest/trip.service";

@Component({
  templateUrl: 'trip-viewer.component.html',
  styleUrls: ['trip-viewer.component.scss']
})
export class TripViewerComponent {
  constructor(private tripService: TripService) {
  }
}
