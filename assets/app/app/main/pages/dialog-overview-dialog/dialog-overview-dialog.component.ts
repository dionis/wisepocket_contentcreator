import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
export interface DialogData {
  message: string;
  messgdetail: string;
}
@Component({
  selector: 'app-dialog-overview-dialog',
  templateUrl: './dialog-overview-dialog.component.html',
  styleUrls: ['./dialog-overview-dialog.component.scss']
})
export class DialogOverviewDialogComponent implements OnInit {
    form: FormGroup;
  ///DOC https://blog.angular-university.io/angular-material-dialog/
  constructor(  
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.form = fb.group({
            action: ["OK", Validators.required],
            showme: [false]
        });
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    //https://material.io/resources/icons/?style=baseline
    this.dialogRef.close({value:"OK", action:this.form.get("showme").value});

  }

}
