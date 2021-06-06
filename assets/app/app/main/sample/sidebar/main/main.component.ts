import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarkerService } from '../../../../services/marker.service';
import { SampleComponent } from '../../sample.component';
import { MatDialog } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';
import {GisServerFormDialogComponent} from '../../gis-form/gis-form.component';
import { locale as english } from '../../i18n/en';
import { locale as turkish } from '../../i18n/tr';
import { locale as spanish } from '../../i18n/es';

//import { ContactsService } from '../../../../../app/main/apps/contacts/contacts.service';

@Component({
    selector   : 'geopoints-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class GeoPointsMainSidebarComponent implements OnInit, OnDestroy
{
    user: any;
    filterBy: string = 'googleMap';

    // Private
    private _unsubscribeAll: Subject<any>;

    dialogRef: any;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _markerService: MarkerService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        //private router:Router
        //private _contactsService: ContactsService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._markerService.sourceMap
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(source=>{
            this.filterBy = source || 'googleMap';
        })


        // this._contactsService.onUserDataChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(user => {
        //         this.user = user;
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._markerService.setSource(filter);
    }

    updateGisLocalServer(){
        this.dialogRef = this._matDialog.open(GisServerFormDialogComponent, {
          height: '600px',
          width: '700px',
          panelClass: 'gis-form-dialog',
          data      : {
              action: 'edit',

          }
      });

      this.dialogRef.afterClosed()
          .subscribe(async (response: any) => {
              if ( !response )
              {
                  return;
              }

              //Update data in View and server
              //this._markerService.updateGisLocalServer();
              console.log(response)

      });
 }
}
