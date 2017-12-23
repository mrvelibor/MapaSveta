import {Component, Input} from "@angular/core";
import {Country} from "../../models/countries/country";
import {CountryService} from "../../services/rest/country.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-country-viewer',
  templateUrl: 'country-viewer.component.html',
  styleUrls: ['country-viewer.component.scss']
})
export class CountryViewerComponent {

  apiUrl = environment.apiUrl;

  @Input('country')
  country: Country;

  constructor(private countryService: CountryService) {
  }
}
