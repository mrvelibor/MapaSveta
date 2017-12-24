import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {TripService} from "../../services/rest/trip.service";
import {Trip} from "../../models/trips/trip";
import {environment} from "../../../environments/environment";
import {Country} from "../../models/countries/country";
import {CountryService} from "../../services/rest/country.service";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-trip-edtior',
  templateUrl: 'trip-editor.component.html',
  styleUrls: ['trip-editor.component.scss']
})
export class TripEditorComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;

  countries: Country[];

  model: Trip;

  isUpdate: boolean;

  @Input('trip')
  set trip(trip: Trip) {
    console.log(trip);
    let obj = Object.assign(new Trip(), trip);
    this.isUpdate = true;
    this.model = obj;
  }

  get recommendation() {
    return this.model;
  }

  @Output('tripSaved')
  changeEmitter: EventEmitter<Trip>;

  constructor(private tripService: TripService,
              private countryService: CountryService) {
    this.model = new Trip();
    this.countries = [];
    this.changeEmitter = new EventEmitter<Trip>();
  }

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
    this.setupFilter();
  }

  ngOnDestroy() {
  }

  filteredCountries: Observable<Country[]>;
  countryInput = new FormControl();

  setupFilter() {
    this.filteredCountries = this.countryInput.valueChanges
      .pipe(
        startWith({} as Country),
        map(country => country && typeof country === 'object' ? country.serbianName : country),
        map(name => name ? this.filter(name) : this.countries.slice())
      );
  }

  filter(name): Country[] {
    return this.countries.filter(option =>
      (option.serbianName.toLowerCase().indexOf(name.toLowerCase()) === 0) ||
      (option.officialName.toLowerCase().indexOf(name.toLowerCase()) === 0)
    );
  }

  displayFn(country: Country): string {
    return country ? country.serbianName : '';
  }

  saveTrip() {
    console.log(this.model);
    (this.isUpdate ? this.tripService.updateTrip(this.model) : this.tripService.createTrip(this.model)).subscribe(
      data => {
        console.log(data);
        this.changeEmitter.emit(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}

@Component({
  selector: 'dialog-trip-edtior',
  templateUrl: 'trip-editor.dialog.html'
})
export class TripEditorDialog {
  constructor(public dialogRef: MatDialogRef<TripEditorDialog>,
              @Inject(MAT_DIALOG_DATA) public trip: Trip) {
  }

  onTripSaved(trip: Trip) {
    this.dialogRef.close(trip);
  }
}
