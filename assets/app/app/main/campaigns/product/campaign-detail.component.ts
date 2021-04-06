import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseUtils } from '../../../../@fuse/utils';
import { CampaignService } from '../../../services/campaign.service';
import { Campaign } from '../../../models/campaign.model';
import { ActivatedRoute } from '@angular/router';
import { Imagen } from '../../../models/image.model';


@Component({
    selector     : 'campaign-detail',
    templateUrl  : './campaign-detail.component.html',
    styleUrls    : ['./campaign-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CampaignDetailComponent implements OnInit, OnDestroy
{
    //product: Product;
    campaign: Campaign;
    pageType: string;
    productForm: FormGroup;
    error = null;
    images: Imagen[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CampaignService} _campaignService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _campaignService: CampaignService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private route: ActivatedRoute,
    )
    {
        // Set the default
        this.campaign = new Campaign();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        //console.log(this.productForm)
        let campID = this.route.snapshot.params['id'];
        this._campaignService.getCampaign(campID)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            res =>{
                if(res !== null){
                    this.campaign = res;
                    this.pageType = 'edit';
                    // if(this.campaign.carrusel1!==null) this.images.push(this.campaign.carrusel1);
                    // if(this.campaign.carrusel2!==null) this.images.push(this.campaign.carrusel2);
                    // if(this.campaign.carrusel3!==null) this.images.push(this.campaign.carrusel3);
                    // if(this.campaign.carrusel4!==null) this.images.push(this.campaign.carrusel4);
                }else{
                    this.campaign = new Campaign();
                    this.pageType = 'new';
                }
                console.log(this.campaign);
                this.productForm = this.createProductForm();
                console.log(this.productForm)
            }
        ),error=>{
            this.pageType = 'error';
            this.error = error;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup
    {
        console.log(this.campaign.titulo);
        return this._formBuilder.group({
            //Basic Info
            titulo            : [this.campaign.titulo],
            descripcion     : [this.campaign.descripcion],
            phone      : [this.campaign.contanctoTelefono],
            email   : [this.campaign.contactoEmail],

            //Aditional Info
            state            : [this.campaign.state],
            city    : [this.campaign.city],
            postalCode    : [this.campaign.direccionPostal],
            //taxRate         : [this.product.taxRate],

            //Images
            icon        : [this.campaign.logo],
            images          : [this.images],

            // Social Networks
            contactoTelegram: [this.campaign.contactoTelegram],
            contactoWhatsapp: [this.campaign. contactoWhatsapp],
            contactoFacebook: [this.campaign.contactoFacebook],
        });
    }

    /**
     * Save product
     */
    saveProduct(): void
    {
        // const data = this.productForm.getRawValue();
        // data.handle = FuseUtils.handleize(data.name);

        // this._ecommerceProductService.saveProduct(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._ecommerceProductService.onProductChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Product saved', 'OK', {
        //             verticalPosition: 'top',
        //             duration        : 2000
        //         });
        //     });
    }

    /**
     * Add product
     */
    addProduct(): void
    {
        // const data = this.productForm.getRawValue();
        // data.handle = FuseUtils.handleize(data.name);

        // this._ecommerceProductService.addProduct(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._ecommerceProductService.onProductChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Product added', 'OK', {
        //             verticalPosition: 'top',
        //             duration        : 2000
        //         });

        //         // Change the location with new one
        //         this._location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
        //     });
    }
}
