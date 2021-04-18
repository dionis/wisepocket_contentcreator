import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';

import { FuseSharedModule } from '../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AuthguardService } from '../../services/authguard.service';

import { SampleComponent } from './sample.component';
import { GeoPointsMainSidebarComponent } from './sidebar/main/main.component';

const routes = [
    {
        path     : 'sample',
        canActivate: [AuthguardService],
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent,
        GeoPointsMainSidebarComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        NgxDropzoneModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        FuseWidgetModule,
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
