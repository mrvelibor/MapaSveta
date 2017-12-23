import {Component, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {Recommendation} from "../../models/recommendations/recommendation";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Address} from "../../models/common/address";
import {CountryService} from "../../services/rest/country.service";
import {Country} from "../../models/countries/country";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-recommendation-edtior',
  templateUrl: 'recommendation-editor.component.html',
  styleUrls: ['recommendation-editor.component.scss']
})
export class RecommendationEditorComponent implements OnInit, OnDestroy {

  model: Recommendation;

  countries: Country[];

  _recommendation: Recommendation;

  @Input('recommendation')
  set recommendation(recommendation: Recommendation) {
    this._recommendation = recommendation;
    let obj = new Recommendation();
    Object.assign(obj, recommendation);
    if (!obj.address) {
      obj.address = new Address();
    }
    this.model = obj;
  }

  get recommendation() {
    return this._recommendation;
  }

  constructor(private recommendationService: RecommendationService,
              private countryService: CountryService) {
    this.model = new Recommendation();
    this.model.address = new Address();
    this.countries = [];
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
    return this.countries.filter(option => option.serbianName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(country: Country): string {
    return country ? country.serbianName : '';
  }

  saveRecommendation() {
    console.log(this.model);
    this.recommendationService.createRecommendation(this.model).subscribe(
      data => {
        console.log(data);
        if (this._recommendation) {
          Object.assign(this._recommendation, this.model);
        } else {
          // TODO: Add to list
        }

      },
      error => {
        console.log(error);
      }
    );
  }
}

@Component({
  selector: 'dialog-recommendation-edtior',
  templateUrl: 'recommendation-editor.dialog.html'
})
export class RecommendationEditorDialog {
  constructor(public dialogRef: MatDialogRef<RecommendationEditorDialog>,
              @Inject(MAT_DIALOG_DATA) public recommendation: Recommendation) {
  }
}
