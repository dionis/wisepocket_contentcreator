import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FileValidator } from 'ngx-material-file-input';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from 'app/main/ui/forms/i18n/en';
import { locale as spanish } from 'app/main/ui/forms/i18n/es';

@Component({
    selector   : 'forms',
    templateUrl: './forms.component.html',
    styleUrls  : ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy
{
    form: FormGroup;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;
    horizontalStepperStep4: FormGroup;
    readonly maxSize = 104857600;
    campaignicon:string = 'campaignicon';
    @ViewChild('fileDorp',{static:false}) inputFile:ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;
    files: File[] = [];
    image1: File = undefined;
    image2: File = undefined;
    image3: File = undefined;
    image4: File = undefined;
    campIconf:File = undefined;




    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this._formBuilder.group({
            nameCampaign: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(120)]],
            description : ['', [Validators.required, Validators.maxLength(800)]]
        });

        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.horizontalStepperStep2 = this._formBuilder.group({
            phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(20)]],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            website: ['', [Validators.required, Validators.pattern(reg)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]]
        });

        this.horizontalStepperStep3 = this._formBuilder.group({
            country   : ['', Validators.required],
            city      : ['', Validators.required],
            state     : ['', Validators.required]
        });
        console.log(this.inputFile);
        console.log(this.horizontalStepperStep2.get('phone'));
        console.log(this.horizontalStepperStep2.get('website'));
        console.log(this.horizontalStepperStep2.get('email'));
    }

    onChage(event){
        console.log(event);
        console.log(this.inputFile);
    }
    onSelectIcon(event){
        console.log(event.addedFiles)
       this.campIconf = event.addedFiles[0];
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
            case "image4":
                this.image4 = event.addedFiles[0];
                break;
            default:
                break;
        }
        //this.files.push(...event.addedFiles);
        //console.log(this.files);
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
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void
    {
        alert('You have finished the horizontal stepper!');
    }
}