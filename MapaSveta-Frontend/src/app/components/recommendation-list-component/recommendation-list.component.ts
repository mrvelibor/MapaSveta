import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {environment} from "../../../environments/environment";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Recommendation} from "../../models/recommendations/recommendation";
import {User} from "../../models/user/user";
import {Country} from "../../models/countries/country";

@Component({
  templateUrl: 'recommendation-list.component.html',
  styleUrls: ['recommendation-list.component.scss']
})
export class RecommendationListComponent implements AfterViewInit {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'city', 'country', 'createdBy', 'description', '_options'];
  dataSource = new MatTableDataSource<Recommendation>([]);

  constructor(private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.recommendationService.getRecommendations().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Recommendation>(data);
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

  viewRecommendation(recommendation: Recommendation) {
    console.log(recommendation);
  }

  viewUser(user: User) {
    console.log(user);
  }

  viewCountry(country: Country) {
    console.log(country);
  }

  editRecommendation(recommendation: Recommendation) {
    console.log(recommendation);
  }

  deleteRecommendation(recommendation: Recommendation) {
    console.log(recommendation);
  }
}
