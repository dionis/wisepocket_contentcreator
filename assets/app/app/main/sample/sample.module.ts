import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '../../../@fuse/shared.module';
import { AuthguardService } from '../../services/authguard.service';
import { PruebaService } from './prueba.service';

import { SampleComponent } from './sample.component';

const routes = [
    {
        path     : 'sample',
        canActivate: [AuthguardService],
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        SampleComponent
    ],
    providers: [
        PruebaService
    ]
})

export class SampleModule
{
}
