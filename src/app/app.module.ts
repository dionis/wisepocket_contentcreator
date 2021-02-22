import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { AuthenticationModule } from './main/authentication/authentication.module';

import { UIFormsModule } from './main/ui/forms/forms.module';

const appRoutes: Routes = [
    {
        path      : 'login',
        redirectTo: 'auth/login'
    },
    {
        path        : 'auth',
        loadChildren: () => import('./main/authentication/authentication.module')
                            .then(m => m.AuthenticationModule)
    },
    {
        path      : 'forms',
        loadChildren: () => import('./main/ui/forms/forms.module')
                            .then(m => m.UIFormsModule)
    }
];

@NgModule({
    declarations: [
        AppComponent

    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AuthenticationModule,
        UIFormsModule

    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
