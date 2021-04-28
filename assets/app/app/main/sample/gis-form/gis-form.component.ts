import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CampaignService } from '../../../services/campaign.service';
import { ImageService } from '../../../services/image.service';

//import { Contact } from '../../../../../app/main/apps/contacts/contact.model';

import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';


import { locale as english } from '../i18n/en';
import { locale as turkish } from '../i18n/tr';
import { locale as spanish } from '../i18n/es';
@Component({
    selector     : 'gis-form-dialog',
    templateUrl  : './gis-form.component.html',
    styleUrls    : ['./gis-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GisServerFormDialogComponent
{
    action: string;
   // contact: Contact;

    marker:any;
    markerForm: FormGroup;
    dialogTitle: string;
    images: File[] = [];
    campaigns = [];

    /**
     * Constructor
     *
     * @param {MatDialogRef<MarkerContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<GisServerFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private campService: CampaignService,
        private imageService: ImageService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,

        //private http: HttpClient;
    )
    {

       //Bibliografy:
       //https://es.wikipedia.org/wiki/Sistema_de_referencia_geod%C3%A9sico


        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);

        // Set the defaults
        this.action = _data.action;
        campService.getCampaignUser('','','').subscribe(data=>{
            this.campaigns = data;
        });

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Geographival Local Server Address';
            this.marker = _data.data;
            console.log(this.marker);

        }
        else
        {
            this.dialogTitle = 'New Geografical Information Server';
            this.marker = {
                url:'',
                description:'',
                related_campaign:''
            };
        }

        this.markerForm = this.createContactForm();
    }


    onRemove(event){
        console.log(event);
        //this.images.splice(this.images.indexOf(event), 1)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
            //phone: [this.contact.lastName],
            //email  : [this.contact.avatar],
            url: ['',Validators.required],
            description : ['',Validators.required],
            //images: [this.contact.jobTitle],
            related_campaign: ['WGS84',Validators.required],
        });
    }

    onSelect(event){
        console.log(event.addedFiles)
        //this.images = event.addedFiles;
      // this.files.push(event.addedFiles[0]);
    }


}
