import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//nimport { Contact } from '../../../../../app/main/apps/contacts/contact.model';

@Component({
    selector     : 'geopoints-form-dialog',
    templateUrl  : './geopoints-form.component.html',
    styleUrls    : ['./geopoints-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GeopointsFormDialogComponent
{
    action: string;
   // contact: Contact;
    contactForm: FormGroup;
    dialogTitle: string;
    files: File[] = [];
    image1: File = undefined;
    image2: File = undefined;
    image3: File = undefined;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<GeopointsFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit GeoPoint';
            //this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'New GeoPoint';
           // this.contact = new Contact({});
        }

        this.contactForm = this.createGeoPointForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createGeoPointForm(): FormGroup
    {
        return this._formBuilder.group({
            //id      : [this.contact.id],
            title    : ['',Validators.required],
            //phone: [this.contact.lastName],
            //email  : [this.contact.avatar],
            url: ['',Validators.required],
            description : ['',Validators.required],
            //images: [this.contact.jobTitle],
            email   : ['',[Validators.required, Validators.email, Validators.maxLength(30)]],
            phone   : ['',Validators.required],
            // address : [this.contact.address],
            // birthday: [this.contact.birthday],
            // notes   : [this.contact.notes]
        });
    }

    onSelect(event) {
        console.log(event);
        switch (event.source.id) {
            case "image1":
                this.image1 = event.addedFiles[0];
                break;
            case "image2":
                this.image2 = event.addedFiles[0];
                break;
            case "image3":
                this.image3 = event.addedFiles[0];
                break;
            default:
                break;
        }
        this.files.push(event.addedFiles[0]);
        //console.log(this.files);
      }
}
