import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {DragDorpDirective} from './dragdrop.directive';

import { FuseSharedModule } from '../../../../@fuse/shared.module';

import { FormsComponent } from '../../../../app/main/ui/forms/forms.component';
import { AuthguardService } from '../../../services/authguard.service';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { from } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [
    {
        path     : 'forms',
        canActivate: [AuthguardService],
        component: FormsComponent
    }
];

@NgModule({
    declarations: [
        FormsComponent,
        DragDorpDirective,
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MaterialFileInputModule,
        NgxDropzoneModule,

        FuseSharedModule,
    ]
})
export class UIFormsModule
{
}
