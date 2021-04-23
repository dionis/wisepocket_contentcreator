import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CampaignService } from '../../../services/campaign.service';

//import { Contact } from '../../../../../app/main/apps/contacts/contact.model';

@Component({
    selector     : 'marker-form-dialog',
    templateUrl  : './marker-form.component.html',
    styleUrls    : ['./marker-form.component.scss'],
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
        private campService: CampaignService
    )
    {
        // Set the defaults
        this.action = _data.action;
        campService.getCampaignUser('','').subscribe(data=>{
            this.campaigns = data;
        });

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Marker';
            this.marker = _data.data;
            //this.images.push(new File())
            console.log(this.marker);
        }
        else
        {
            this.dialogTitle = 'New Marker';
            this.marker = {
                title: '',
                url:'',
                description:'',
                phone: '',
                email: '',
                lat: this._data.lat,
                lon: this._data.lon
            };
        }

        this.markerForm = this.createContactForm();
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
