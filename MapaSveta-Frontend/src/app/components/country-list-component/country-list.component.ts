import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {CountryService} from "../../services/rest/country.service";
import {environment} from "../../../environments/environment";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Country} from "../../models/countries/country";

@Component({
  templateUrl: 'country-list.component.html',
  styleUrls: ['country-list.component.scss']
})
export class CountryListComponent implements AfterViewInit {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['flag', 'serbianName', 'officialName', 'capital', 'diallingCode', 'domain', 'languages'];
  dataSource = new MatTableDataSource<Country>([]);

  constructor(private countryService: CountryService) {
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
    console.log(country);
  }

  editCountry(country: Country) {
    console.log(country);
  }

  deleteCountry(country: Country) {
    console.log(country);
  }
}
