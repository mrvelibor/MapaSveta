import {Component} from "@angular/core";
import {UserService} from "../../services/rest/user.service";

@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss']
})
export class UserListComponent {
  constructor(private userService: UserService) {
  }
}
