import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {TripService} from "../../services/rest/trip.service";
import {environment} from "../../../environments/environment";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Trip} from "../../models/trips/trip";
import {Country} from "../../models/countries/country";

@Component({
  templateUrl: 'trip-list.component.html',
  styleUrls: ['trip-list.component.scss']
})
export class TripListComponent implements AfterViewInit {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['dateFrom', 'dateTo', 'city', 'country', 'details', '_options'];
  dataSource = new MatTableDataSource<Trip>([]);

  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    this.tripService.getTrips().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Trip>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    console.log(trip);
  }

  deleteTrip(trip: Trip) {
    console.log(trip);
  }
}
