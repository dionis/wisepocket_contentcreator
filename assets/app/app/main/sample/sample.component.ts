import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';
import { PruebaService } from './prueba.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as spanish } from './i18n/es';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    pruebas: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {PruebaService} _pruebaService
     */
    constructor(
        private _pruebaService: PruebaService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);
        
        this.pruebas = this._pruebaService.getMyCamps(); // Le asignamos al obj el resultado de la funcion
    }
}


