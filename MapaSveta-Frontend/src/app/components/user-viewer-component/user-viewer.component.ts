import {Component} from "@angular/core";
import {UserService} from "../../services/rest/user.service";

@Component({
  templateUrl: 'user-viewer.component.html',
  styleUrls: ['user-viewer.component.scss']
})
export class UserViewerComponent {
  constructor(private userService: UserService) {
  }
}
