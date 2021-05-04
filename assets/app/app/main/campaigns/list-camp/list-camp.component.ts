import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseUtils } from '../../../../@fuse/utils';
import { takeUntil } from 'rxjs/internal/operators';
import { CampaignService } from '../../../services/campaign.service';
import { Campaign } from '../../../models/campaign.model';
import { EcommerceProductsService } from '../../apps/e-commerce/products/products.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../main/campaigns/list-camp/i18n/en';
import { locale as spanish } from '../../../main/campaigns/list-camp/i18n/es';

@Component({
  selector     : 'campaign-list',
    templateUrl  : './list-camp.component.html',
    styleUrls    : ['./list-camp.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ListCampComponent implements AfterViewInit,OnInit {
    dataSource: CampaignDataSource | null;
    displayedColumns = ['id',
        'logo',
        'titulo',
        'phone',
        'direccionPostal',
        'contactoEmail',
        //'contactoTelegram',
        'active'
    ];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    criteria: string = '';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
       // private _ecommerceProductsService: EcommerceProductsService,
        private campService: CampaignService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);

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
        //console.log(this._ecommerceProductsService.products)
        console.log( 'OnInit',this.filter.nativeElement.value);
        this.dataSource = new CampaignDataSource(this.campService);
        console.log(this.dataSource)
        this.dataSource.loadUserCampaigns(0,10,this.criteria,'');
        // fromEvent(this.filter.nativeElement, 'keyup')
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(150),
        //         distinctUntilChanged()
        //     )
        //     .subscribe(() => {
        //         if ( !this.dataSource )
        //         {
        //             return;
        //         }

        //         this.dataSource.filter = this.filter.nativeElement.value;
        //     });
    }
    ngAfterViewInit() {
        //let criteria = ''
       console.log( this.filter.nativeElement.value);
        fromEvent(this.filter.nativeElement,'keyup')
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                //this.paginator.pageIndex = 0;
                this.loadCampaignsPage();

            })
        )
        .subscribe()
        this.sort.sortChange.subscribe((event) => {
            this.criteria = event.active +' ' + event.direction
            //this.paginator.pageIndex = 0;
        });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => {
                    this.loadCampaignsPage()
                })
            )
            .subscribe();

    }

    loadCampaignsPage(){
        console.log(this.paginator.pageSize);
        console.log(this.criteria);
        this.dataSource
        .loadUserCampaigns(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.criteria,
            this.filter.nativeElement.value);
    }

    sortData(event){
        console.log(event)
    }
}
export class CampaignDataSource extends DataSource<any>{
    private campagainsSubject= new BehaviorSubject<any[]>([]);
    private errorSubject = new Subject<string>();
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private _countCampaigns: number = 0;

    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    constructor(private campService:CampaignService,
        // private _matPaginator: MatPaginator,
        // private _matSort: MatSort
        ){
            super();
            this.campService.countUserCampaigns()
            .subscribe(res=>{
                console.log(res);
                this._countCampaigns = res['data'];
            })

        }
    get filteredData(): any
    {
        //return this.campagainsSubject.value;
        return  this._filteredDataChange.value
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]>{
        console.log(this.campagainsSubject)
        //if(this.campagainsSubject.value.length !== 0){
            return this.campagainsSubject.asObservable();
        //}

    }
    disconnect(){
        this.campagainsSubject.complete();
        this.loadingSubject.complete();
    }
    public get countCampaigns(){
        return this._countCampaigns;
    }

    loadUserCampaigns(page:number,limit:number,criteria:string,filter:string){
        this.campService.getCampaignUser(page.toString(),limit.toString(),criteria,filter)
        .subscribe(campaigns=>{
            console.log(campaigns);
            this.campagainsSubject.next(campaigns)
        }, error=>{
            this.errorSubject.next(error.message);
        });
        console.log(this.campagainsSubject.value)
    }

    loadCampaigns(page:number,limit:number){

        this.campService.fetchCampagins(page.toString(),limit.toString())
        .subscribe(campaigns=>{
            console.log(campaigns);
            this.campagainsSubject.next(campaigns)
        } );
        console.log(this.campagainsSubject.value)
    }
    // /**
    //  * Filter data
    //  *
    //  * @param data
    //  * @returns {any}
    //  */
    //     filterData(data): any
    //     {
    //         if ( !this.filter )
    //         {
    //             return data;
    //         }
    //         return FuseUtils.filterArrayByString(data, this.filter);
    //     }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
     sortData(data, matSort:any): any[]
     {
         if ( !matSort.active || matSort.direction === '' )
         {
             return data;
         }

         return data.sort((a, b) => {
             let propertyA: number | string = '';
             let propertyB: number | string = '';

             switch ( matSort.active )
             {
                 case 'id':
                     [propertyA, propertyB] = [a.id, b.id];
                     break;
                 case 'titulo':
                     [propertyA, propertyB] = [a.titulo, b.titulo];
                     break;
                 case 'contactoTelefono':
                     [propertyA, propertyB] = [a.contactoTelefono, b.contactoTelefono];
                     break;
                 case 'direccionPostal':
                     [propertyA, propertyB] = [a.direccionPostal, b.direccionPostal];
                     break;
                 case 'contactoEmail':
                     [propertyA, propertyB] = [a.contactoEmail, b.contactoEmail];
                     break;
                 case 'active':
                     [propertyA, propertyB] = [a.active, b.active];
                     break;
             }

             const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
             const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

             return (valueA < valueB ? -1 : 1) * (matSort.direction === 'asc' ? 1 : -1);
         });
     }


}


