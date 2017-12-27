import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Country} from "../../models/countries/country";
import {CountryService} from "../../services/rest/country.service";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../models/user/user";
import {AuthenticationService} from "../../services/rest/authentication.service";
import {TripEditorDialog} from "../trip-editor-component/trip-editor.component";
import {Trip} from "../../models/trips/trip";

@Component({
  selector: 'app-country-viewer',
  templateUrl: 'country-viewer.component.html',
  styleUrls: ['country-viewer.component.scss']
})
export class CountryViewerComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;

  userSubscription: Subscription;
  currentUser: User;

  _country: Country;

  @Input('country')
  set country(value: Country) {
    this._country = value;
    this.isInWishlist = false;
    if (this.currentUser) {
      this.countryService.isInWishlist(this.country).subscribe(result => this.isInWishlist = result);
    }
  }

  get country() {
    return this._country;
  }

  isInWishlist: boolean;

  @Output('countryUpdated')
  eventEmitter: EventEmitter<any>;

  constructor(private authService: AuthenticationService,
              private countryService: CountryService,
              private dialog: MatDialog) {
    this.eventEmitter = new EventEmitter<any>();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  addTrip() {
    let trip = new Trip();
    trip.country = this.country;
    let dialogRef = this.dialog.open(TripEditorDialog, {
      data: trip
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(trip, result);
        this.eventEmitter.next({country: trip.country, trip: trip});
      }
    });
  }

  addToWishlist() {
    this.countryService.addToWishlist(this.country).subscribe(result => {
      if (result) {
        this.isInWishlist = true;
        this.eventEmitter.next({country: this.country, wishlist: {isInWishlist: this.isInWishlist}});
      };
    });
  }

  removeFromWishlist() {
    this.countryService.removeFromWishlist(this.country).subscribe(result => {
      if (result) {
        this.isInWishlist = false;
        this.eventEmitter.next({country: this.country, wishlist: {isInWishlist: this.isInWishlist}});
      };
    });
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
