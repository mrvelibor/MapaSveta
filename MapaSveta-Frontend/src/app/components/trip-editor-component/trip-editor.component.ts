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
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";
import {AlertService} from "../../services/ui/alert/alert.service";
import {LoaderService} from "../../services/ui/loader/loader.service";

@Component({
  selector: 'app-trip-editor',
  templateUrl: 'trip-editor.component.html',
  styleUrls: ['trip-editor.component.scss']
})
export class TripEditorComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;

  countries: Country[];
  countriesSubscription: Subscription;

  model: Trip;

  isUpdate: boolean;

  @Input('trip')
  set trip(trip: Trip) {
    console.log(trip);
    let obj = Object.assign(new Trip(), trip);
    this.isUpdate = obj.id != null;
    this.model = obj;
  }

  get recommendation() {
    return this.model;
  }

  @Output('tripSaved')
  changeEmitter: EventEmitter<Trip>;

  constructor(private tripService: TripService,
              private countryService: CountryService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
    this.model = new Trip();
    this.countries = [];
    this.changeEmitter = new EventEmitter<Trip>();
  }

  ngOnInit() {
    this.countriesSubscription = this.countryService.countries$.subscribe(
      data => {
        this.countries = data;
      }
    );
    this.setupFilter();
  }

  ngOnDestroy() {
    this.countriesSubscription.unsubscribe();
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
  selector: 'dialog-trip-editor',
  templateUrl: 'trip-editor.dialog.html'
})
export class TripEditorDialog {
  constructor(public dialogRef: MatDialogRef<TripEditorDialog>,
              @Inject(MAT_DIALOG_DATA) public trip: Trip) {
    if (!trip) {
      this.trip = new Trip();
    }
  }

  onTripSaved(trip: Trip) {
    this.dialogRef.close(trip);
  }
}
