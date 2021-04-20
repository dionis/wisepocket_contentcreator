import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';


import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ContactsComponent } from '../../../../app/main/apps/contacts/contacts.component';
import { ContactsService } from '../../../../app/main/apps/contacts/contacts.service';
import { ContactsContactListComponent } from '../../../../app/main/apps/contacts/contact-list/contact-list.component';
import { ContactsSelectedBarComponent } from '../../../../app/main/apps/contacts/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from '../../../../app/main/apps/contacts/sidebars/main/main.component';
import { ContactsContactFormDialogComponent } from '../../../../app/main/apps/contacts/contact-form/contact-form.component';
import { TopicItemComponent } from './contact-list/topic-item/topic-item.component';
import { TranslateModule } from '@ngx-translate/core';

import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {DragDorpDirective} from './dragdrop.directive';


const routes: Routes = [
    {
        path     : '**',
        component: ContactsComponent,
        resolve  : {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations   : [
        ContactsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactsContactFormDialogComponent,
        TopicItemComponent,
        DragDorpDirective
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatListModule,
        MatCardModule,
        TranslateModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        FuseWidgetModule,

        QuillModule.forRoot({
          modules: {
            syntax: false,
            toolbar: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              ['bold', 'italic', 'underline'],        // toggled buttons
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'align': ''}, { 'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],                      // text direction
              [{ 'color': [] }, { 'background': [] }],        // dropdown with defaults from theme
              ['link', 'image', 'video']                         // link and image, video
            ]
          },
          placeholder :"Insert text"
        }),
        NgxDropzoneModule
    ],
    providers      : [
        ContactsService
    ],
    entryComponents: [
        ContactsContactFormDialogComponent
    ]
})
export class ContactsModule
{
}
