import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/rest/user.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {User} from "../../models/user/user";
import {environment} from "../../../environments/environment";
import {Country} from "../../models/countries/country";
import {CountryViewerDialog} from "../country-viewer-component/country-viewer.component";
import {UserEditorDialog} from "../user-editor-component/user-editor.component";
import {ConfirmationDialog, DialogData} from "../confirmation-dialog/confirmation.dialog";
import {UserViewerDialog} from "../user-viewer-component/user-viewer.component";

@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'gender', 'birthday', 'country', '_options'];
  dataSource = new MatTableDataSource<User>([]);

  constructor(private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
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

  editUser(user: User) {
    let dialogRef = this.dialog.open(UserEditorDialog, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      Object.assign(user, result);
    });
  }

  deleteUser(user: User) {
    let dialogRef = this.dialog.open(ConfirmationDialog, {
      data: new DialogData("Obrisati korisnika?", `Da li ste sigurni da želite da obrišete korisnika ${user.email}?`)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user).subscribe(
          data => {
            console.log(data);
            var index = this.dataSource.data.indexOf(user, 0);
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
