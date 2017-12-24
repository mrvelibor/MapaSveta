import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'confirmation.dialog.html',
  styleUrls: ['confirmation.dialog.scss']
})
export class ConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onButtonClick(value: number) {
    this.dialogRef.close(value);
  }
}

export class DialogData {
  title: string;
  message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}
