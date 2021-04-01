import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { FormsComponent } from 'app/main/ui/forms/forms.component';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { from } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {DragDorpDirective} from 'e:/proyectos/wisepocket_contentcreator/assets/app/app/main/ui/forms/dragdrop.directive';

const routes: Routes = [
    {
        path     : 'ui/forms',
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

        TranslateModule,

        FuseSharedModule,
        MaterialFileInputModule,
        NgxDropzoneModule,
    ]
})
export class UIFormsModule
{
}
