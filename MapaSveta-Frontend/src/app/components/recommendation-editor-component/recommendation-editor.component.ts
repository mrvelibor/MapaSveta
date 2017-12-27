import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Address} from "../../models/common/address";
import {CountryService} from "../../services/rest/country.service";
import {Country} from "../../models/countries/country";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs/Subscription";
import {AlertService} from "../../services/ui/alert/alert.service";
import {LoaderService} from "../../services/ui/loader/loader.service";

@Component({
  selector: 'app-recommendation-editor',
  templateUrl: 'recommendation-editor.component.html',
  styleUrls: ['recommendation-editor.component.scss']
})
export class RecommendationEditorComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;

  countries: Country[];
  countriesSubscription: Subscription;

  model: Recommendation;

  @Input('recommendation')
  set recommendation(recommendation: Recommendation) {
    let obj = Object.assign(new Recommendation(), recommendation);
    obj.address = Object.assign(new Address(), obj.address);
    this.model = obj;
  }

  get recommendation() {
    return this.model;
  }

  @Output('recommendationSaved')
  changeEmitter: EventEmitter<Recommendation>;

  constructor(private recommendationService: RecommendationService,
              private countryService: CountryService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
    this.model = new Recommendation();
    this.model.address = new Address();
    this.countries = [];
    this.changeEmitter = new EventEmitter<Recommendation>();
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

  saveRecommendation() {
    console.log(this.model);
    this.recommendationService.createRecommendation(this.model).subscribe(
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
  selector: 'dialog-recommendation-editor',
  templateUrl: 'recommendation-editor.dialog.html'
})
export class RecommendationEditorDialog {
  constructor(public dialogRef: MatDialogRef<RecommendationEditorDialog>,
              @Inject(MAT_DIALOG_DATA) public recommendation: Recommendation) {
    if (!recommendation) {
      this.recommendation = new Recommendation();
    }
  }

  onRecommendationSaved(recommendation: Recommendation) {
    this.dialogRef.close(recommendation);
  }
}
