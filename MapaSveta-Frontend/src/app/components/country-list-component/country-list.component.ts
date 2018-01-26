import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryService} from '../../services/rest/country.service';
import {environment} from '../../../environments/environment';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Country} from '../../models/countries/country';
import {CountryViewerDialog} from '../country-viewer-component/country-viewer.component';
import {Subscription} from 'rxjs/Subscription';
import {ListComponent} from '../list-component/list.component';

@Component({
  templateUrl: 'country-list.component.html',
  styleUrls: ['country-list.component.scss', '../list-component/list.component.scss']
})
export class CountryListComponent extends ListComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;

  countriesSubscription: Subscription;

  displayedColumns = ['flag', 'serbianName', 'officialName', 'capital', 'diallingCode', 'domain', 'languages', 'visitorCount', 'wishListCount', 'recommendationCount'];

  dataSource = new MatTableDataSource<Country>([]);

  get tableDataSource(): MatTableDataSource<any> {
    return this.dataSource;
  }

  constructor(private countryService: CountryService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.countriesSubscription = this.countryService.countries$.subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    );
  }

  ngOnDestroy() {
    this.countriesSubscription.unsubscribe();
  }

  viewCountry(country: Country) {
    this.dialog.open(CountryViewerDialog, {
      data: country
    });
  }
}
