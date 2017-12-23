import {Component} from "@angular/core";
import {TripService} from "../../services/rest/trip.service";

@Component({
  templateUrl: 'trip-list.component.html',
  styleUrls: ['trip-list.component.scss']
})
export class TripListComponent {
  constructor(private tripService: TripService) {
  }
}
