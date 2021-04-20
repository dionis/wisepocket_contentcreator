import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './main/authentication/auth.interceptors.service';
import { Error404Module } from './main/errors/404/error-404.module';
import {Error500Module} from './main/errors/500/error-500.module'

const appRoutes: Routes = [
    {
        path        : 'auth',
        loadChildren: () => import('./main/authentication/authentication.module')
                            .then(m => m.AuthenticationModule)
    },
    {
        path        : 'dashboard',
        loadChildren: () => import('./main/sample/sample.module')
                            .then(m => m.SampleModule)
    },
    {
        path      : '**',
        redirectTo: 'auth/login'
    },

    
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        FormsModule,
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
        Error404Module,
        Error500Module,

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]    ,
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
