import {Component, Inject, Input} from "@angular/core";
import {UserService} from "../../services/rest/user.service";
import {User} from "../../models/user/user";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-user-viewer',
  templateUrl: 'user-viewer.component.html',
  styleUrls: ['user-viewer.component.scss']
})
export class UserViewerComponent {

  apiUrl = environment.apiUrl;

  @Input('user')
  user: User;

  constructor(private userService: UserService) {
  }
}

@Component({
  selector: 'dialog-user-viewer',
  templateUrl: 'user-viewer.dialog.html'
})
export class UserViewerDialog {
  constructor(public dialogRef: MatDialogRef<UserViewerDialog>,
              @Inject(MAT_DIALOG_DATA) public user: User) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
