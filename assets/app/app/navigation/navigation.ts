import { FuseNavigation } from '../../@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Maps',
                translate: 'NAV.MAP.TITLE',
                type     : 'item',
                //icon     : 'email',
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
        type     : 'collapsable',
        children : [
            {
                id       : 'campings_table',
                title    : 'Campings List',
                translate: 'NAV.CAMPINGIN_LIST.TITLE',
                type     : 'item',
                icon     : 'list',
                url      : 'campaigns/campaigns-list',
                badge    : {
                    title    : '25',
                    translate: 'NAV.CAMPINGIN_LIST.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'wizard',
                title    : 'Wizard',
                translate: 'NAV.WIZARD',
                type     : 'item',
                icon     : 'send',
                url      : 'campaigns/forms'
              },
              {
                id       : 'games',
                title    : 'Games',
                translate: 'NAV.GAME',
                type     : 'item',
                icon     : 'send',
                url      : 'campaigns/game'
              },
              {
                id       : 'survey',
                title    : 'Survey',
                translate: 'NAV.SURVEY',
                type     : 'item',
                icon     : 'send',
                url      : 'campaigns/survey'
              },

        ]
    },
    {
      id       : 'e-commerce',
      title    : 'E-Commerce',
      translate: 'NAV.ECOMMERCE',
      type     : 'collapsable',
      icon     : 'shopping_cart',
      children : [
          {
              id        : 'products',
              title     : 'Products',
              type      : 'item',
              url       : '/apps/e-commerce/products',
              exactMatch: true
          },
          {
              id        : 'productDetail',
              title     : 'Product Detail',
              type      : 'item',
              url       : '/apps/e-commerce/products/1/printed-dress',
              // exactMatch: true
          },
          {
              id        : 'orders',
              title     : 'Orders',
              type      : 'item',
              url       : '/apps/e-commerce/orders',
              exactMatch: true
          },
          {
              id        : 'orderDetail',
              title     : 'Order Detail',
              type      : 'item',
              url       : '/apps/e-commerce/orders/1',
              exactMatch: true
          },
          {
            id        : 'maps',
            title     : 'Maps',
            type      : 'item',
            url       : '/apps/componets-third-party/google-maps',
            exactMatch: true
        }
      ]
  },

  {
    id       : 'mail',
    title    : 'Mail',
    translate: 'NAV.MAIL.TITLE',
    type     : 'item',
    icon     : 'email',
    url      : '/apps/mail',
    badge    : {
        title    : '25',
        translate: 'NAV.MAIL.BADGE',
        bg       : '#F44336',
        fg       : '#FFFFFF'
    }
},
// {
//     id       : 'mail-ngrx',
//     title    : 'Mail Ngrx',
//     translate: 'NAV.MAIL_NGRX.TITLE',
//     type     : 'item',
//     icon     : 'email',
//     url      : '/apps/mail-ngrx',
//     badge    : {
//         title    : '13',
//         translate: 'NAV.MAIL_NGRX.BADGE',
//         bg       : '#EC0C8E',
//         fg       : '#FFFFFF'
//     }
// },
{
  id       : 'contacts',
  title    : 'Contacts',
  translate: 'NAV.CONTACTS',
  type     : 'item',
  icon     : 'account_box',
  url      : '/apps/contacts'
},

{
  id   : 'profile',
  title: 'Profile',
  type : 'item',
  icon : 'person',
  url  : '/pages/profile'
},


];
