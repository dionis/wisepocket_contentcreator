import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  messgdetail: string;
}
@Component({
  selector: 'app-dialog-overview-error-dialog',
  templateUrl: './dialog-overview-error-dialog.component.html',
  styleUrls: ['./dialog-overview-error-dialog.component.scss']
})
export class DialogOverviewErrorDialogComponent implements OnInit {

  ///DOC https://blog.angular-university.io/angular-material-dialog/
  constructor(  public dialogRef: MatDialogRef<DialogOverviewErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    //https://material.io/resources/icons/?style=baseline
    this.dialogRef.close("Accept");

  }

}
