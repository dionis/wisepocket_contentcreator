import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { FileValidator } from 'ngx-material-file-input';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImageService } from '../../../../../services/image.service';
import { Campaign } from '../../../../../models/campaign.model';
import { Imagen } from '../../../../../models/image.model';
import { CampaignService } from '../../../../../services/campaign.service';
import { FileUploadService } from '../../../../../services/file-upload.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../i18n/en';
import { locale as spanish } from '../../i18n/es';
@Component({
  selector: 'topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class TopicItemComponent implements OnInit, OnDestroy {

   widget1:any = {
    'ranges'      : {
        'DY' : 'Yesterday',
        'DT' : 'Today',
        'DTM': 'Tomorrow'
    },
    'currentRange': 'DT',
    'data'        : {
        'label': 'DUE TASKS',
        'count': {
            'DY' : 21,
            'DT' : 25,
            'DTM': 19
        },
        'extra': {
            'label': 'Completed',
            'count': {
                'DY' : 6,
                'DT' : 7,
                'DTM': '-'
            }

        }
    },
    'detail'      : 'You can show some detailed information about this widget in here.'
   }
   widget2:any = {
    'title' : 'Overdue',
    'data'  : {
        'label': 'TASKS',
        'count': 4,
        'extra': {
            'label': 'Yesterday\'s overdue',
            'count': 2
        }
    },
    'detail': 'You can show some detailed information about this widget in here.'
   }
   widget3:any = {
    'title' : 'Issues',
    'data'  : {
        'label': 'OPEN',
        'count': 32,
        'extra': {
            'label': 'Closed today',
            'count': 0
        }
    },
    'detail': 'You can show some detailed information about this widget in here.'
   }

  topicImages : File[];

  topicVideos : File[];

  campImage:File = undefined;
  campVideo:File = undefined;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private imageService: ImageService,
    private campService: CampaignService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService) {
      this._fuseTranslationLoaderService.loadTranslations(english, spanish);

      // Set the private defaults
      this._unsubscribeAll = new Subject();
     }

  ngOnInit(): void {
  }

   onSelectImage(event){
        console.log(event.addedFiles)
        this.campImage = event.addedFiles[0];
       this.topicImages.push(  this.campImage );
      // this.files.push(event.addedFiles[0]);
    }

    onSelectVideo(event){
      console.log(event.addedFiles)
      this.campVideo = event.addedFiles[0];
     this.topicVideos.push( this.campVideo);
    // this.files.push(event.addedFiles[0]);
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }





}
