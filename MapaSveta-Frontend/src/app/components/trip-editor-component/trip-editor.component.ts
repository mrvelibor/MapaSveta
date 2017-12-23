import {Component, Input} from "@angular/core";
import {TripService} from "../../services/rest/trip.service";
import {Trip} from "../../models/trips/trip";

@Component({
  selector: 'app-trip-edtior',
  templateUrl: 'trip-editor.component.html',
  styleUrls: ['trip-editor.component.scss']
})
export class TripEditorComponent {

  @Input('trip')
  trip: Trip;

  constructor(private tripService: TripService) {
  }
}
