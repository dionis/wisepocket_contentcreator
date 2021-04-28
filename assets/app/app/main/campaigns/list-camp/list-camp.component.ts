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
        'contactoTelefono',
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
        this.dataSource = new CampaignDataSource(this.campService, this.paginator, this.sort);
        console.log(this.dataSource)
        //this.dataSource.loadUserCampaigns(0,10);
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
        this.paginator.page
            .pipe(
                tap(() => this.loadCampaignsPage())
            )
            .subscribe();
    }

    loadCampaignsPage(){
        console.log(this.paginator.pageSize);
        this.dataSource.loadUserCampaigns(this.paginator.pageIndex,this.paginator.pageSize);
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
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
        ){
            super();
            // this.campService.countUserCampaigns()
            // .subscribe(res=>{
            //     console.log(res);
            //     this._countCampaigns = res['data'];
            // })
            this.loadUserCampaigns(0, this._matPaginator.pageSize)


        }

   set filteredData(value: any)
   {

        console.log(" Insert data ==> ", value);

        //this.campagainsSubject.next(value);
        this._filteredDataChange.next(value);

    }
    get filteredData(): any
    {
        //return this.campagainsSubject.value;
        return  this._filteredDataChange.value
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]>{
        // console.log(this.campagainsSubject)
        // //if(this.campagainsSubject.value.length !== 0){
        //     return this.campagainsSubject.asObservable();
        // //}

        const displayDataChanges = [
          this._matPaginator.page,
          this._matSort.sortChange
      ];

      return merge(...displayDataChanges).pipe(map( () => {

              //let data = this._ecommerceOrdersService.orders.slice();

              // data = this.filterData(data);

              // this.filteredData = [...data];

              // data = this.sortData(data);

              // Grab the page's slice of data.
              console.log("Cantidad de elementos por pagina ", this._matPaginator.pageSize)
              console.log("Pagina actual ", this._matPaginator.pageIndex  )

              const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;

              console.log("Posicion en el arreglo ", startIndex);
              //return data.splice(startIndex, this._matPaginator.pageSize);

             this.loadUserCampaigns(this._matPaginator.pageIndex , this._matPaginator.pageSize)

             return this.campagainsSubject.value;
          }))

    }
    disconnect(){
        this.campagainsSubject.complete();
        this.loadingSubject.complete();
    }
    public get countCampaigns(){
        return this._countCampaigns;
    }

    loadUserCampaigns(page:number,limit:number): Promise<any[]>{
        return new Promise ((resolve,reject)=>{
          if (typeof(limit) === 'undefined')
             limit = 5;
          this.campService.getCampaignUser(page.toString(),limit.toString())
            .toPromise().then( (result:Campaign[])=>{
              if (typeof(result) !== 'undefined')
                 this._countCampaigns = result.length;
              console.log("Pagination values ==> ",  this._countCampaigns)
              //this.campagainsSubject.next(result);
              this.filteredData = result;
              resolve(result);


            }).catch( error=>reject(error));
        })
        // .subscribe(campaigns=>{
        //     console.log(campaigns);
        //     this.campagainsSubject.next(campaigns)
        // }, error=>{
        //     this.errorSubject.next(error.message);
        // } );
        // console.log(this.campagainsSubject.value)
    }

    loadCampaigns(page:number,limit:number){
       if (typeof(limit) === 'undefined')
          limit = 5;

        this.campService.fetchCampagins(page.toString(),limit.toString())
        .subscribe(campaigns=>{
            console.log(campaigns);
            this.campagainsSubject.next(campaigns)
        } );

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

    // /**
    //  * Sort data
    //  *
    //  * @param data
    //  * @returns {any[]}
    //  */
    //  sortData(data): any[]
    //  {
    //      if ( !this._matSort.active || this._matSort.direction === '' )
    //      {
    //          return data;
    //      }

    //      return data.sort((a, b) => {
    //          let propertyA: number | string = '';
    //          let propertyB: number | string = '';

    //          switch ( this._matSort.active )
    //          {
    //              case 'id':
    //                  [propertyA, propertyB] = [a.id, b.id];
    //                  break;
    //              case 'name':
    //                  [propertyA, propertyB] = [a.name, b.name];
    //                  break;
    //              case 'categories':
    //                  [propertyA, propertyB] = [a.categories[0], b.categories[0]];
    //                  break;
    //              case 'price':
    //                  [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
    //                  break;
    //              case 'quantity':
    //                  [propertyA, propertyB] = [a.quantity, b.quantity];
    //                  break;
    //              case 'active':
    //                  [propertyA, propertyB] = [a.active, b.active];
    //                  break;
    //          }

    //          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    //          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    //          return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    //      });
    //  }


}

//export class FilesDataSource extends DataSource<any>
// {
//     private campagainsSubject= new BehaviorSubject<any[]>([]);
//     private _filterChange = new BehaviorSubject('');
//     private _filteredDataChange = new BehaviorSubject('');

//     /**
//      * Constructor
//      *
//      * @param {CampaignService} campService
//      * @param {MatPaginator} _matPaginator
//      * @param {MatSort} _matSort
//      */
//     constructor(
//         private campService: CampaignService,
//         private _matPaginator: MatPaginator,
//         private _matSort: MatSort
//     )
//     {
//         super();

//         this.filteredData = this.loadCampaigns();
//     }
//     loadCampaigns(): any[]{
//         let arrayCamp: any[] = [];
//         this.campService.fetchCampagins('','')
//         .subscribe((campaigns:any[])=>{
//             console.log(campaigns);
//             this.campagainsSubject.next(campaigns)
//             arrayCamp = campaigns;
//         } );
//         return arrayCamp;
//         //console.log(this.campagainsSubject.value)
//     }

//     /**
//      * Connect function called by the table to retrieve one stream containing the data to render.
//      *
//      * @returns {Observable<any[]>}
//      */
//     connect(): Observable<any[]>
//     {
//         const displayDataChanges = [
//             this.campagainsSubject,
//             this._matPaginator.page,
//             this._filterChange,
//             this._matSort.sortChange
//         ];

//         return merge(...displayDataChanges)
//             .pipe(
//                 map(() => {
//                         let data = this.loadCampaigns().slice();

//                         data = this.filterData(data);

//                         this.filteredData = [...data];

//                         data = this.sortData(data);

//                         // Grab the page's slice of data.
//                         const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
//                         return data.splice(startIndex, this._matPaginator.pageSize);
//                     }
//                 ));
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Accessors
//     // -----------------------------------------------------------------------------------------------------

//     // Filtered data
//     get filteredData(): any
//     {
//         return this._filteredDataChange.value;
//     }

//     set filteredData(value: any)
//     {
//         this._filteredDataChange.next(value);
//     }

//     // Filter
//     get filter(): string
//     {
//         return this._filterChange.value;
//     }

//     set filter(filter: string)
//     {
//         this._filterChange.next(filter);
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Filter data
//      *
//      * @param data
//      * @returns {any}
//      */
//     filterData(data): any
//     {
//         if ( !this.filter )
//         {
//             return data;
//         }
//         return FuseUtils.filterArrayByString(data, this.filter);
//     }

//     /**
//      * Sort data
//      *
//      * @param data
//      * @returns {any[]}
//      */
//     sortData(data): any[]
//     {
//         if ( !this._matSort.active || this._matSort.direction === '' )
//         {
//             return data;
//         }

//         return data.sort((a, b) => {
//             let propertyA: number | string = '';
//             let propertyB: number | string = '';

//             switch ( this._matSort.active )
//             {
//                 case 'id':
//                     [propertyA, propertyB] = [a.id, b.id];
//                     break;
//                 case 'name':
//                     [propertyA, propertyB] = [a.name, b.name];
//                     break;
//                 case 'categories':
//                     [propertyA, propertyB] = [a.categories[0], b.categories[0]];
//                     break;
//                 case 'price':
//                     [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
//                     break;
//                 case 'quantity':
//                     [propertyA, propertyB] = [a.quantity, b.quantity];
//                     break;
//                 case 'active':
//                     [propertyA, propertyB] = [a.active, b.active];
//                     break;
//             }

//             const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//             const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//             return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
//         });
//     }

//     /**
//      * Disconnect
//      */
//     disconnect(): void
//     {
//     }
// }

