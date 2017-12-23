import {Component} from "@angular/core";
import {UserService} from "../../services/rest/user.service";

@Component({
  templateUrl: 'user-editor.component.html',
  styleUrls: ['user-editor.component.scss']
})
export class UserEditorComponent {
  constructor(private userService: UserService) {
  }
}
