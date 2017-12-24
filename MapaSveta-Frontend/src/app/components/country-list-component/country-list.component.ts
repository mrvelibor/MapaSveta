import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CountryService} from "../../services/rest/country.service";
import {environment} from "../../../environments/environment";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Country} from "../../models/countries/country";
import {CountryViewerDialog} from "../country-viewer-component/country-viewer.component";
import {Subscription} from "rxjs/Subscription";

@Component({
  templateUrl: 'country-list.component.html',
  styleUrls: ['country-list.component.scss']
})
export class CountryListComponent implements OnInit, AfterViewInit, OnDestroy {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  countriesSubscription: Subscription;

  displayedColumns = ['flag', 'serbianName', 'officialName', 'capital', 'diallingCode', 'domain', 'languages'];
  dataSource = new MatTableDataSource<Country>([]);

  constructor(private countryService: CountryService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.countriesSubscription = this.countryService.countries$.subscribe(
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

  ngOnDestroy() {
    this.countriesSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }

  viewCountry(country: Country) {
    this.dialog.open(CountryViewerDialog, {
      data: country
    });
  }
}
