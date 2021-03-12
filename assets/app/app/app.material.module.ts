import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MaterialFileInputModule,
  ],
  exports: [
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MaterialFileInputModule,
  ]
})
export class AppMaterialModule { }
