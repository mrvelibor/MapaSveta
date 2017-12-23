import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/rest/user.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {User} from "../../models/user/user";
import {environment} from "../../../environments/environment";
import {Country} from "../../models/countries/country";

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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<User>(data);
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

  viewUser(user: User) {
    console.log(user);
  }

  viewCountry(country: Country) {
    console.log(country);
  }

  editUser(user: User) {
    console.log(user);
  }

  deleteUser(user: User) {
    console.log(user);
  }
}
