import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

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
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  
  ],
  exports: [
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MaterialFileInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
 
  ]
})
export class AppMaterialModule { }
