import { Component, Inject, ViewEncapsulation } from '@angular/core';
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
        console.log(_data.lat, _data.lon)
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Marker';
            //this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'New Marker';
            //this.contact = new Contact({});
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
        console.log(this._data.lat, this._data.lon)
        return this._formBuilder.group({
            title    : ['',Validators.required],
            //phone: [this.contact.lastName],
            //email  : [this.contact.avatar],
            url: ['',Validators.required],
            description : ['',Validators.required],
            //images: [this.contact.jobTitle],
            email   : ['',[Validators.required, Validators.email, Validators.maxLength(30)]],
            phone   : ['',Validators.required],
            lat   : [this._data.lat,Validators.required], 
            lon: [this._data.lon,Validators.required],
        });
    }
}
