import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';
import {UserService} from "../../services/rest/user.service";
import {User} from "../../models/user/user";
import {Subscription} from "rxjs/Subscription";
import {Country} from "../../models/countries/country";
import {environment} from "../../../environments/environment";
import {CountryService} from "../../services/rest/country.service";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-account-editor',
  templateUrl: 'account-editor.component.html',
  styleUrls: ['account-editor.component.scss']
})
export class AccountEditorComponent implements OnInit, OnDestroy{

  apiUrl = environment.apiUrl;

  countries: Country[];
  countriesSubscription: Subscription;

  userSubscription: Subscription;
  model: User;

  loading: boolean;

  constructor(private authService: AuthenticationService,
              private alertService: AlertService,
              private userService: UserService,
              private countryService: CountryService,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.model = user);
    this.countriesSubscription = this.countryService.countries$.subscribe(
      data => {
        this.countries = data;
      }
    );
    this.setupFilter();
  }

  ngOnDestroy() {
    this.loaderService.hideProgress();
    this.userSubscription.unsubscribe();
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

  updateAccount() {
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.userService.updateUser(this.model).subscribe(
      data => {
        this.loaderService.hideProgress();
      },
      error => {
        this.loaderService.hideProgress();
      }
    )
  }
}
