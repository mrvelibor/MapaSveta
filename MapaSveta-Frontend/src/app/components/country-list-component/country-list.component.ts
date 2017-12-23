import {Component} from "@angular/core";
import {CountryService} from "../../services/rest/country.service";

@Component({
  templateUrl: 'country-list.component.html',
  styleUrls: ['country-list.component.scss']
})
export class CountryListComponent {
  constructor(private countryService: CountryService) {
  }
}
