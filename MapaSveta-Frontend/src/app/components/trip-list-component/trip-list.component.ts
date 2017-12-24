import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {TripService} from "../../services/rest/trip.service";
import {environment} from "../../../environments/environment";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Trip} from "../../models/trips/trip";
import {Country} from "../../models/countries/country";
import {ConfirmationDialog, DialogData} from "../confirmation-dialog/confirmation.dialog";
import {TripEditorDialog} from "../trip-editor-component/trip-editor.component";

@Component({
  templateUrl: 'trip-list.component.html',
  styleUrls: ['trip-list.component.scss']
})
export class TripListComponent implements AfterViewInit {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['country', 'city', 'dateFrom', 'dateTo', 'details', '_options'];
  dataSource = new MatTableDataSource<Trip>([]);

  constructor(private tripService: TripService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.tripService.getTrips().subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // MatTableDataSource defaults to lowercase matches
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
