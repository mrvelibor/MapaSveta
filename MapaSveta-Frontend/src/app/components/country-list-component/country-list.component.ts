import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {CountryService} from "../../services/rest/country.service";
import {environment} from "../../../environments/environment";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Country} from "../../models/countries/country";
import {CountryViewerDialog} from "../country-viewer-component/country-viewer.component";

@Component({
  templateUrl: 'country-list.component.html',
  styleUrls: ['country-list.component.scss']
})
export class CountryListComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['flag', 'serbianName', 'officialName', 'capital', 'diallingCode', 'domain', 'languages'];
  dataSource = new MatTableDataSource<Country>([]);

  constructor(private countryService: CountryService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Country>(data);
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

  viewCountry(country: Country) {
    this.dialog.open(CountryViewerDialog, {
      data: { country: country }
    });
  }
}
