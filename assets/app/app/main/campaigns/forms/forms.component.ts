import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Campaign } from '../../../models/campaign.model';
import { Imagen } from '../../../models/image.model';
import { CampaignService } from '../../../services/campaign.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../main/campaigns/forms/i18n/en';
import { locale as spanish } from '../../../main/campaigns/forms/i18n/es';
import { ICountry, ICity, IState } from 'country-state-city/src/interface';
import csc from 'country-state-city';

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
    horizontalStepperStep5: FormGroup;
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

    public selectedCountry: ICountry[] = [{isoCode: '', name: '', phonecode: '', flag: '', currency: '', latitude: '', longitude: ''}];
    public countries: ICountry [];
    public states: IState [];
    public cities: ICity [];
    



    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        
        private _formBuilder: FormBuilder,
        private uploadService: FileUploadService,
        private campService: CampaignService,
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
            phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            website: ['', [Validators.required, Validators.pattern(reg)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]]
        });

        this.horizontalStepperStep3 = this._formBuilder.group({
            countries      : ['', Validators.required],
            states     : ['', Validators.required],
            cities      : ['', Validators.required],
            primaryColor: ['', Validators.required],
            secondaryColor: ['', Validators.required]
        });

        this.horizontalStepperStep4 = this._formBuilder.group({
            facebook      : ['', Validators.required],
            whatsapp      : ['', Validators.required],
            telegram      : ['', Validators.required]
        });
        //console.log(this.inputFile);
        //this.campService.fetchCampagins('0','10');
        console.log(csc.getAllCountries());
        this.countries = csc.getAllCountries();


    }
    onChage(event){
        console.log(event);
        console.log(this.inputFile);
    }
    onSelectIcon(event){
        console.log(event.addedFiles)
       this.campIconf = event.addedFiles[0];
       this.files.push(event.addedFiles[0]);
    }
    onSelect(event, isoCode: string) {
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
        this.files.push(event.addedFiles[0]);
        //console.log(this.files);
        this.states = csc.getAllStates().filter(item => item.countryCode === isoCode);
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
    async finishHorizontalStepper()
    {
        let dataCamp = new Campaign()
        dataCamp.titulo = this.horizontalStepperStep1.get('nameCampaign').value;
        dataCamp.descripcion = this.horizontalStepperStep1.get('description').value;
        dataCamp.contanctoTelefono= this.horizontalStepperStep2.get('phone').value;
        dataCamp.contactoEmail = this.horizontalStepperStep2.get('email').value;
        dataCamp.direccionPostal = this.horizontalStepperStep2.get('postalCode').value;
        dataCamp.colorPrincipal = this.horizontalStepperStep3.get('primaryColor').value;
        dataCamp.colorSecundario = this.horizontalStepperStep3.get('secondaryColor').value;
        dataCamp.city = this.horizontalStepperStep3.get('city').value;
        dataCamp.state = this.horizontalStepperStep3.get('state').value;
        dataCamp.contactoWhatsapp = this.horizontalStepperStep2.get('phone').value;
        dataCamp.contactoFacebook = this.horizontalStepperStep2.get('website').value;
        dataCamp.contactoTelegram = this.horizontalStepperStep2.get('website').value;
        if(this.campIconf){
            console.log(this.campIconf);
            await this.uploadService.upload_files(this.campIconf).then(img=>{
                console.log(img);
                let data = img['data'];
                dataCamp.logo = data[0].id;
            });
        }
        if(this.image1){
            await this.uploadService.upload_files(this.image1)
            .then((img:any)=>{
                console.log(img); 
                let data = img['data'];
                dataCamp.carrusel1 = data[0].id;
            });
        }
        if(this.image2){
            await this.uploadService.upload_files(this.image2)
            .then((img:any)=>{
                console.log(img);
                let data = img['data']; 
                dataCamp.carrusel2 = data[0].id;
            });
        }
        if(this.image3){
            await this.uploadService.upload_files(this.image3)
            .then((img:any)=>{
                console.log(img);
                let data = img['data']; 
                dataCamp.carrusel3 = data[0].id;
            });
        }
        if(this.image4){
            await this.uploadService.upload_files(this.image3)
            .then((img:any)=>{
                console.log(img);
                let data = img['data'];  
                dataCamp.carrusel4 = data[0].id;
            });
        }
        console.log(dataCamp);
       this.campService.addCampaign(dataCamp)
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(campaign =>{
           console.log(campaign);
       },error=>{
           console.log(error)
       });
        alert('You have finished the horizontal stepper!');
    }
}
