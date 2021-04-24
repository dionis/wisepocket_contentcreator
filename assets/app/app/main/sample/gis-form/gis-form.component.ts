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

export class MarkerContactFormDialogComponent
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
        public matDialogRef: MatDialogRef<MarkerContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private campService: CampaignService,
        private imageService: ImageService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,

        //private http: HttpClient;
    )
    {

        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);

        // Set the defaults
        this.action = _data.action;
        campService.getCampaignUser('','').subscribe(data=>{
            this.campaigns = data;
        });

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Marker';
            this.marker = _data.data;
            console.log(this.marker);
            this.loadImage();
        }
        else
        {
            this.dialogTitle = 'New Geografical Information Server';
            this.marker = {
                url:'',
                description:''              
            };
        }

        this.markerForm = this.createContactForm();
    }

    async loadImage(){
        if(this.marker.images.length>0){
            let frontImages = this.marker.images
            for (let index = 0; index < frontImages.length; index++) {
                const element = frontImages[index];
                let ext = element.titulo.split('.')[1];
                await this.imageService.getImage(element).subscribe(response=>{
                    console.log(response);
                    this.images.push(response)
                })
                //let img = this.imageService.getImage(element);
                //this.images.push(img);
                //this.images.push(new File([element.path],element.titulo,{type:'image/'+ext}));
            }
            //console.log(this.images    )
        } 
    }
    onRemove(event){
        console.log(event);
        this.images.splice(this.images.indexOf(event), 1)
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
            title    : [this.marker.title,Validators.required],
            //phone: [this.contact.lastName],
            //email  : [this.contact.avatar],
            url: [this.marker.url,Validators.required],
            description : [this.marker.description,Validators.required],
            //images: [this.contact.jobTitle],
            email   : [this.marker.email,[Validators.required, Validators.email, Validators.maxLength(30)]],
            phone   : [this.marker.phone,Validators.required],
            lat   : [this.marker.lat,Validators.required], 
            lon: [this.marker.lon,Validators.required],
            related_campaign: [this.marker.related_campaign?this.marker.related_campaign:''
                ,Validators.required],
        });
    }

    onSelect(event){
        console.log(event.addedFiles)
       this.images = event.addedFiles;
      // this.files.push(event.addedFiles[0]);
    }
}
