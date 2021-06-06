import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '../../../@fuse/shared.module';
import { AuthguardService } from '../../services/authguard.service';

// const routes = [
//     {
//         path        : 'dashboards/analytics',
//         loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
//     },
//     {
//         path        : 'dashboards/project',
//         loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
//     },
//     {
//         path        : 'mail',
//         loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
//     },
//     {
//         path        : 'mail-ngrx',
//         loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
//     },
//     {
//         path        : 'chat',
//         loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
//     },
//     {
//         path        : 'calendar',
//         loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
//     },
//     {
//         path        : 'e-commerce',
//         loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
//     },
//     {
//         path        : 'academy',
//         loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
//     },
//     {
//         path        : 'todo',
//         loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
//     },
//     {
//         path        : 'file-manager',
//         loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
//     },
//     {
//         path        : 'contacts',
//         loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
//     },
//     {
//         path        : 'scrumboard',
//         loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
//     }
// ];

const routes = [
  {
      path        : 'mail',
      canActivate: [AuthguardService],
      loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
  },
  {
      path        : 'mail-ngrx',
      canActivate: [AuthguardService],
      loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
  },
  {
      path        : 'e-commerce',
      canActivate: [AuthguardService],
      loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
  },
  {
    path        : 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
},
  {
    path        : 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
},
  {
    path        : 'componets-third-party',
    canActivate: [AuthguardService],
    loadChildren: () => import('./componets-third-party/components-third-party.module').then(m => m.ComponentsThirdPartyModule)
}
 ];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
