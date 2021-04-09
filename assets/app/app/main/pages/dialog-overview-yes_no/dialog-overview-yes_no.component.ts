import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
export interface DialogData {
  message: string;
  messgdetail: string;
}
@Component({
  selector: 'app-dialog-overview-yes_no',
  templateUrl: './dialog-overview-yes_no.component.html',
  styleUrls: ['./dialog-overview-yes_no.component.scss']
})
export class DialogOverviewYesNoComponent implements OnInit {
  form: FormGroup;
  ///DOC https://blog.angular-university.io/angular-material-dialog/
  ///code source: https://github.com/angular-university/angular-material-course/tree/3-dialog-finished/src/app/course-dialog
  constructor( 
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewYesNoComponent>,
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
    //this.form.setValue({action:'NO'})
    //this.dialogRef.close(this.form.value);
    this.dialogRef.close("NO");

  }

  onYesClick(): void {
    //https://material.io/resources/icons/?style=baseline

     //this.form.setValue({action:'OK'})
     //this.dialogRef.close(this.form.value);
     this.dialogRef.close({value:"OK", action:this.form.get("showme").value});

  }

}
