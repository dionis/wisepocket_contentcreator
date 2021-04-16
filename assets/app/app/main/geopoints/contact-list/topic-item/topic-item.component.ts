import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class TopicItemComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
