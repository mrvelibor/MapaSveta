import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/rest/user.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user/user';
import {environment} from '../../../environments/environment';
import {Country} from '../../models/countries/country';
import {CountryViewerDialog} from '../country-viewer-component/country-viewer.component';
import {UserEditorDialog} from '../user-editor-component/user-editor.component';
import {ConfirmationDialog, DialogData} from '../confirmation-dialog/confirmation.dialog';
import {UserViewerDialog} from '../user-viewer-component/user-viewer.component';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';
import {ListComponent} from '../list-component/list.component';

@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss', '../list-component/list.component.scss']
})
export class UserListComponent extends ListComponent implements OnInit {
  apiUrl = environment.apiUrl;

  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'gender', 'birthday', 'country', '_options'];

  dataSource = new MatTableDataSource<User>([]);

  get tableDataSource(): MatTableDataSource<any> {
    return this.dataSource;
  }

  constructor(private userService: UserService,
              private alertService: AlertService,
              private loaderService: LoaderService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    );
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
      this.alertService.success('Korisnik je izmenjen.');
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
            this.alertService.success('Korisnik je obrisan.');
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
