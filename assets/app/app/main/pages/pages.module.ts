import { NgModule } from '@angular/core';
import { LoginModule } from '../../../app/main/pages/login/login.module';
import { ProfileModule } from '../../../app/main/pages/profile/profile.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        ProfileModule
    ]
})
export class PagesModule {

}
