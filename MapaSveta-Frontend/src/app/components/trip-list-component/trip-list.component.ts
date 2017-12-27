import {Component, OnInit} from '@angular/core';
import {TripService} from '../../services/rest/trip.service';
import {environment} from '../../../environments/environment';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Trip} from '../../models/trips/trip';
import {Country} from '../../models/countries/country';
import {ConfirmationDialog, DialogData} from '../confirmation-dialog/confirmation.dialog';
import {TripEditorDialog} from '../trip-editor-component/trip-editor.component';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';
import {ListComponent} from '../list-component/list.component';

@Component({
  templateUrl: 'trip-list.component.html',
  styleUrls: ['trip-list.component.scss', '../list-component/list.component.scss']
})
export class TripListComponent extends ListComponent implements OnInit {
  apiUrl = environment.apiUrl;

  displayedColumns = ['country', 'city', 'dateFrom', 'dateTo', 'details', '_options'];

  dataSource = new MatTableDataSource<Trip>([]);

  get tableDataSource(): MatTableDataSource<any> {
    return this.dataSource;
  }

  constructor(private tripService: TripService,
              private alertService: AlertService,
              private loaderService: LoaderService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.tripService.getTrips().subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    );
  }

  viewTrip(trip: Trip) {
    console.log(trip);
  }

  viewCountry(country: Country) {
    console.log(country);
  }

  editTrip(trip: Trip) {
    let dialogRef = this.dialog.open(TripEditorDialog, {
      data: trip
    });
    dialogRef.afterClosed().subscribe(result => {
      this.alertService.success('Putovanje je izmenjeno.');
      Object.assign(trip, result);
    });
  }

  deleteTrip(trip: Trip) {
    let dialogRef = this.dialog.open(ConfirmationDialog, {
      data: new DialogData("Obrisati putovanje?", `Da li ste sigurni da želite da obrišete putovanje u ${trip.country.serbianName}?`)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tripService.deleteTrip(trip).subscribe(
          data => {
            console.log(data);
            this.alertService.success('Putovanje je obrisano.');
            var index = this.dataSource.data.indexOf(trip, 0);
            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
            }
          }
        )
      }
    });
  }
}
