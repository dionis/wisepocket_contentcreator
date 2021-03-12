import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../@fuse/animations';
import { UserService } from '../../../../app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    SignIn(){
        const data = this.loginForm.getRawValue();
        this.userService.login(data)
        .then( res=>{
            this.router.navigate(['dashboard/sample']);
            console.log(res);
        })
        .catch(err=>{
            if(err.status === 400){
                alert('EMAIL O LA CONTRASEÑA INCORRECTOS');
            }
            if(err.status === 0 || err.status === 500){
                alert('ERROR INESPERADO INTENTELO MÁS TARDE...');
            }
            console.log(err);
        });

    }
}
