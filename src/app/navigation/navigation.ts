import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
    {
        id       : 'camping',
        title    : 'Campings',
        translate: 'NAV.CAMPINGS',
        type     : 'group',
        children : [
            {
                id       : 'campings_table',
                title    : 'Campings List',
                translate: 'NAV.CampingsList.TITLE',
                type     : 'item',
                icon     : 'list',
                url      : '/#',
                badge    : {
                    title    : '25',
                    translate: 'NAV.CampingsList.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
  
];
