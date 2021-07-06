import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import 'hammerjs';

import { FuseModule } from '../@fuse/fuse.module';
import { FuseSharedModule } from '../@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '../@fuse/components';

import { fuseConfig } from '../app/fuse-config';

import { FakeDbService } from '../app/fake-db/fake-db.service';
import { NgxDropzoneModule } from 'ngx-dropzone';


import { AppComponent } from '../app/app.component';
import { LayoutModule } from '../app/layout/layout.module';
import { SampleModule } from '../app/main/sample/sample.module';
import { AuthenticationModule } from './main/authentication/authentication.module';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './main/authentication/auth.interceptors.service';
import { Error404Module } from './main/errors/404/error-404.module';
import {Error500Module} from './main/errors/500/error-500.module';
import { AuthguardService } from './services/authguard.service';
import {AppMaterialModule} from './app.material.module';
import { ListCampComponent } from './main/campaigns/list-camp/list-camp.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CampaignsModule } from './main/campaigns/campaigns.module';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

const appRoutes: Routes = [
    {
        path        : 'auth',
        loadChildren: () => import('./main/authentication/authentication.module')
                            .then(m => m.AuthenticationModule)
    },

    {
        path        : 'dashboard',
        canActivate: [AuthguardService],
        loadChildren: () => import('./main/sample/sample.module')
                            .then(m => m.SampleModule)
    },

    {
      path        : 'apps',
      loadChildren: () => import('../app/main/apps/apps.module').then(m => m.AppsModule)
  },
  {
    path        : 'campaigns',
    canActivate: [AuthguardService],
    loadChildren: () => import('../app/main/campaigns/campaigns.module').then(m => m.CampaignsModule)
    },
    {
        path        : 'maps',
        canActivate: [AuthguardService],
        loadChildren: () => import('../app/main/geopoints/geopoints.module').then(m => m.GeopointsModule)
    },
  {
      path        : 'pages',
      canActivate: [AuthguardService],
      loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
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
        InMemoryWebApiModule.forRoot(FakeDbService, {
          delay             : 0,
          passThruUnknownUrl: true
         }),


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
        CampaignsModule,
        Error404Module,
        Error500Module,
        AppMaterialModule,
        NgxDropzoneModule,
       
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
