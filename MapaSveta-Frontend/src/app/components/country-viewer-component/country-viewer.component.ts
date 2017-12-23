import {Component, Inject, Input} from "@angular/core";
import {Country} from "../../models/countries/country";
import {CountryService} from "../../services/rest/country.service";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

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

@Component({
  selector: 'dialog-country-viewer',
  templateUrl: 'country-viewer.dialog.html'
})
export class CountryViewerDialog {
  constructor(public dialogRef: MatDialogRef<CountryViewerDialog>,
              @Inject(MAT_DIALOG_DATA) public country: Country) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
