import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Marker';
            this.marker = _data.data;
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
        });
    }
}
