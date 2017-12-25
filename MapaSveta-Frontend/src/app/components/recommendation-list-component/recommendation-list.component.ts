import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {RecommendationService} from "../../services/rest/recommendation.service";
import {environment} from "../../../environments/environment";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Recommendation} from "../../models/recommendations/recommendation";
import {User} from "../../models/user/user";
import {Country} from "../../models/countries/country";
import {RecommendationEditorDialog} from "../recommendation-editor-component/recommendation-editor.component";
import {CountryViewerDialog} from "../country-viewer-component/country-viewer.component";
import {ConfirmationDialog, DialogData} from "../confirmation-dialog/confirmation.dialog";
import {AuthenticationService} from "../../services/rest/authentication.service";
import {Subscription} from "rxjs/Subscription";
import {UserViewerDialog} from "../user-viewer-component/user-viewer.component";
import {RecommendationViewerDialog} from "../recommendation-viewer-component/recommendation-viewer.component";

@Component({
  templateUrl: 'recommendation-list.component.html',
  styleUrls: ['recommendation-list.component.scss']
})
export class RecommendationListComponent implements OnInit, AfterViewInit, OnDestroy {

  apiUrl = environment.apiUrl;

  subscription: Subscription;
  currentUser: User;

  displayedColumns = ['name', 'city', 'country', 'createdBy', 'description', '_options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Recommendation>([]);

  constructor(private authService: AuthenticationService,
              private recommendationService: RecommendationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(
      user => {
        this.currentUser = user;
        if (!this.currentUser) {
          var index = this.displayedColumns.indexOf('_options', 0);
          if (index > -1) {
            this.displayedColumns.splice(index, 1);
          }
        }
      }
    );
    this.recommendationService.getRecommendations().subscribe(
      data => {
        console.log(data);
        this.dataSource._updateChangeSubscription();
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }

  viewRecommendation(recommendation: Recommendation) {
    this.dialog.open(RecommendationViewerDialog, {
      data: recommendation
    });
  }

  viewUser(user: User) {
    this.dialog.open(UserViewerDialog, {
      data: user
    });
  }

  viewCountry(country: Country) {
    this.dialog.open(CountryViewerDialog, {
      data: country
    });
  }

  editRecommendation(recommendation: Recommendation) {
    let dialogRef = this.dialog.open(RecommendationEditorDialog, {
      data: recommendation
    });
    dialogRef.afterClosed().subscribe(result => {
      Object.assign(recommendation, result);
    });
  }

  deleteRecommendation(recommendation: Recommendation) {
    let dialogRef = this.dialog.open(ConfirmationDialog, {
      data: new DialogData("Obrisati zanimljivost?", `Da li ste sigurni da želite da obrišete zanimljivost ${recommendation.name}?`)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recommendationService.deleteRecommendation(recommendation).subscribe(
          data => {
            console.log(data);
            var index = this.dataSource.data.indexOf(recommendation, 0);
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
