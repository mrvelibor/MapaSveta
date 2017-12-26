import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {UserService} from "../../services/rest/user.service";
import {environment} from "../../../environments/environment";
import {Country} from "../../models/countries/country";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../models/user/user";
import {CountryService} from "../../services/rest/country.service";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AlertService} from "../../services/ui/alert/alert.service";
import {LoaderService} from "../../services/ui/loader/loader.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: 'user-editor.component.html',
  styleUrls: ['user-editor.component.scss']
})
export class UserEditorComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;

  countries: Country[];
  countriesSubscription: Subscription;

  model: User;

  @Input('user')
  set user(user: User) {
    let obj = Object.assign(new User(), user);
    this.model = obj;
  }

  get user() {
    return this.model;
  }

  @Output('userSaved')
  changeEmitter: EventEmitter<User>;

  constructor(private userService: UserService,
              private countryService: CountryService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
    this.model = new User();
    this.countries = [];
    this.changeEmitter = new EventEmitter<User>();
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

  saveUser() {
    console.log(this.model);
    this.userService.updateUser(this.model).subscribe(
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
  selector: 'dialog-user-editor',
  templateUrl: 'user-editor.dialog.html'
})
export class UserEditorDialog {
  constructor(public dialogRef: MatDialogRef<UserEditorDialog>,
              @Inject(MAT_DIALOG_DATA) public user: User) {
  }

  onUserSaved(user: User) {
    this.dialogRef.close(user);
  }
}
