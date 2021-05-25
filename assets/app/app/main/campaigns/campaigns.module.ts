import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {DragDorpDirective} from './forms/dragdrop.directive';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '../../../@fuse/shared.module';

import { FormsComponent } from './forms/forms.component';
import { AuthguardService } from '../../services/authguard.service';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { from } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ListCampComponent } from './list-camp/list-camp.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { CampaignDetailComponent } from './product/campaign-detail.component';
import { GameComponent } from './game/game.component';
import { SurveyComponent } from './survey/survey.component';


const routes: Routes = [

  {
    path     : 'forms',
      canActivate: [AuthguardService],
      component: FormsComponent
  },
  {
    path     : 'game',
    canActivate: [AuthguardService],
    component: GameComponent
  },
  {
    path     : 'survey',
    canActivate: [AuthguardService],
    component: SurveyComponent
  },

  {
      path     : 'campaigns-list',
      canActivate: [AuthguardService],
      component: ListCampComponent
  },
  {
    path     : 'campaigns-detail/:id',
    canActivate: [AuthguardService],
    component: CampaignDetailComponent
}

];

@NgModule({
  declarations: [
    FormsComponent,
    GameComponent,
    SurveyComponent,
    DragDorpDirective,
    ListCampComponent,
    CampaignDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MaterialFileInputModule,
    TranslateModule,
    NgxDropzoneModule,
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatSnackBarModule,
    FuseSharedModule,
  ]
})
export class CampaignsModule { }
