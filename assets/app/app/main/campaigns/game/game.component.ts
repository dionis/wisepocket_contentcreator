import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Campaign } from '../../../models/campaign.model';
import { Imagen } from '../../../models/image.model';
import { FileUploadService } from '../../../services/file-upload.service';
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy 
{
  form: FormGroup;

  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  readonly maxSize = 104857600;
  gameicon: string = 'gameicon';
 @ViewChild('fileDorp', {static: false}) inputFile: ElementRef;
  
  private _unsubscribeAll: Subject<any>;
  files: File[] = []; 
  gameIconf: File = undefined;
  image1: File = undefined;
  image2: File = undefined;
  image3: File = undefined;
  image4: File = undefined;
  
  constructor(
    private _formBuilder: FormBuilder,
    // private _fuseTranslationLoaderService: FuseTranslationLoaderService

  ) 
  {

    // Load the translations
    // this._fuseTranslationLoaderService.loadTranslations(english, spanish);

  
    this._unsubscribeAll = new Subject();

  }

  ngOnInit(): void 
  {
    this.horizontalStepperStep1 = this._formBuilder.group({
      nameGame     : ['', Validators.required],
      cant_preg    : ['',[ Validators.required, Validators.maxLength(20)]],
      cant_resp    : ['', Validators.required]
    });
    
    this.horizontalStepperStep2 = this._formBuilder.group({
      redacte      : ['', Validators.required],
      redacte1     : ['', Validators.required],
      redacte2     : ['', Validators.required],
      redacte3     : ['', Validators.required],
      redacte4     : ['', Validators.required]
    });
  }
  

  onChage(event){
    console.log(event);
    console.log(this.inputFile);
  }
  onSelectIcon(event){
   console.log(event.addedFiles);
   this.gameIconf = event.addedFiles[0];
   this.files.push(event.addedFiles[0]);
  }

  ngOnDestroy(): void
  {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
  }

  // onSelectedChange(): void
  // {
  //       this._mailService.toggleSelectedMail(this.mail.id);
  // }
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

  }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    

}
