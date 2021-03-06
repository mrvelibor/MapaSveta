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
import {LoaderService} from "../../services/ui/loader/loader.service";
import {AlertService} from "../../services/ui/alert/alert.service";
import {ListComponent} from '../list-component/list.component';

@Component({
  templateUrl: 'recommendation-list.component.html',
  styleUrls: ['recommendation-list.component.scss', '../list-component/list.component.scss']
})
export class RecommendationListComponent extends ListComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;

  subscription: Subscription;
  currentUser: User;

  displayedColumns = ['name', 'country', 'city', 'createdBy', 'description', '_options'];

  dataSource = new MatTableDataSource<Recommendation>([]);

  get tableDataSource(): MatTableDataSource<any> {
    return this.dataSource;
  }

  constructor(private authService: AuthenticationService,
              private recommendationService: RecommendationService,
              private alertService: AlertService,
              private loaderService: LoaderService,
              private dialog: MatDialog) {
    super();
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
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      if (result) {
        this.alertService.success('Zanimljivost je izmenjena.');
        Object.assign(recommendation, result);
      }
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
            this.alertService.success('Zanimljivost je obrisana.');
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
