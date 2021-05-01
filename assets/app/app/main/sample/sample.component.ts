import { AfterViewChecked, AfterViewInit,
     Component,
     ElementRef,
     OnChanges,
     OnDestroy,
     OnInit,
     SimpleChanges,
      ViewChild,
      ViewEncapsulation } from '@angular/core';

import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as spanish } from './i18n/es';
import * as L from 'leaflet'
import { MarkerService } from '../../services/marker.service';
import { MatDialog } from '@angular/material/dialog';
//import { GeopointsFormDialogComponent } from './contact-form/geopoints-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseSidebarService } from '../../../@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '../../../@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MarkerContactFormDialogComponent } from './marker-form/marker-form.component';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SampleComponent implements OnInit, AfterViewInit, OnDestroy
{
    private map;
    private  uris = [
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        'http://localhost:8080/geoserver/wisepocket/wms'
    ];
    private iconRetinaUrl = 'assets/leaflets/marker-icon-2x.png';
    private iconUrl = 'assets/leaflets/marker-icon.png';
    private shadowUrl = 'assets/leaflets/marker-shadow.png';
    private iconDefault;
    private current_position: number;
    private current_accuracy: number;
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;
    private sourceChange = true;
    @ViewChild('mapcontainer',{static:false}) mapContainer: ElementRef;


    serverMap: any;
    searchInput: FormControl;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseSidebarService: FuseSidebarService,
        private markerService: MarkerService,
        private _matDialog: MatDialog,
        private _router: Router,
        private imageService:ImageService
    )
    {
        this.searchInput = new FormControl('');
        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);

        this.iconDefault = L.icon({
            iconRetinaUrl:this.iconRetinaUrl,
            iconUrl: this.iconUrl,
            shadowUrl: this.shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          });
        this._unsubscribeAll = new Subject<any>();
        L.Marker.prototype.options.icon = this.iconDefault;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onLocationFound(e) {
        // if position defined, then remove the existing position marker and accuracy circle from the map
        if (this.current_position) {
            this.map.removeLayer(this.current_position);
            this.map.removeLayer(this.current_accuracy);
        }

        var radius = e.accuracy / 2;

        this.current_position = L.marker(e.latlng,this.iconDefault).addTo(this.map)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();

        this.current_accuracy = L.circle(e.latlng, radius).addTo(this.map);
      }

      onLocationError(e) {
        alert(e.message);
    }
    locate() {
        this.map.locate({setView: true, maxZoom: 16});
    }

    builtMap(latlon:any,bonus:any){
        this.mapContainer.nativeElement.innerHTML = "<div id='map'></div>";
        this.map = new L.map('map',{
            center: latlon,
            maxBounds: bonus,
            //crs: L.CRS.EPSG4326,
            zoom: 6
        });
        console.log(this.mapContainer);
    }

    private initMap(){
        let tiles;
        let corner1= L.latLng(19.8351702,-84.9514723);
        let corner2 = L.latLng(23.2431588,-74.1343019);
        let bonus = L.latLngBounds(corner1, corner2);
        switch (this.serverMap) {
            case 'googleMap':
                tiles = L.tileLayer(`http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`,{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3'],
                attribution: "CUBA"
              });
              break;
            case 'geoServer':

               ///Find in Backed Configuration System if exist
               this.markerService.getGisServerConfiguration().then( infoData=>{
                   if (typeof(infoData) === 'undefined' || infoData == null) {
                     //Show dialog to set new GIS server values and update
                     //database
                     console.log("Show Dialog to insert  GIS Configuration");

                   }else {
                     let gisServerAddress = 'http://localhost:8080/geoserver/wisepocket/wms';
                     let gisAttribution = "CUBA";
                    tiles = L.tileLayer.wms(gisServerAddress,{
                      layers: 'wisepocket:gis_osm_roads_free_1',
                      srs: "EPSG:4326",
                      height: 768,
                      width:330,
                      attribution: gisAttribution
                    });


                   }

               })
               .catch(error=>{
                  ///Show Dialog Error Because not exits data or some
                  ///error happen

               })
            break;
            case 'openStretMap':
                tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            	maxZoom: 20,
            	attribution: 'CUBA'
                });
                break;
            default:
                break;
        }
        this.builtMap(corner1,bonus);
        tiles.addTo(this.map);
    }
    private  onMark(){
        if(this.map){
            this.map.on("click", async e => {
                //console.log(e.latlng); // get the coordinates
                 let flag = await this.newMarker(e.latlng.lat,e.latlng.lng,'new')
                .subscribe(async (response: FormGroup) => {
                    if ( !response )
                    {
                        //console.log('NO')
                        return false;
                    }
                    let data = response[0].value
                    let files = response[1];
                    let imagesCarruselIds = [];
                    if(files.length>0){
                        await this.imageService.addImage(files)
                        .then((img)=>{
                            console.log("Saved image" , img);
                            let data = img['data'];
                            imagesCarruselIds = img
                            //dataCamp.carrusel = img;
                        });
                    }
                    this.markerService.createMarker(e,data)
                    .then(async (response:any)=>{
                        let succes = response['success'];
                        if(succes){
                            let object = response['data'];
                            if(object!==null){
                                if(imagesCarruselIds.length>0){
                                    await this.markerService.asociateImages(imagesCarruselIds,object.id)
                                }
                            }
                            let marker= L.marker([e.latlng.lat, e.latlng.lng],this.iconDefault);
                            marker.bindPopup(this.markerService.makePopup(object));
                            marker.on('mouseover', function (e) {
                                this.openPopup();
                            });
                            marker.on('mouseout', function (e) {
                                this.closePopup();
                            });
                            marker.on('click', e=> {//error
                               this.editMarker(object,marker);
                            });
                            marker.addTo(this.map);
                        }
                        return succes
                    })

                    //console.log(response);
                   //this._contactsService.updateContact(response.getRawValue());
                });
            });
        }
    }

    private async loadMarkers(){
        await this.markerService.getAllMarkers()
        .then(markers=>{
            for (let index = 0; index < markers.length; index++) {
                let mark = markers[index];
                let marker = L.marker([mark.lat, mark.lon],this.iconDefault);
                marker.bindPopup(this.markerService.makePopup(mark));
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });
                marker.on('click', e=> {//ERROR
                    this.editMarker(mark,marker);
                });
                marker.addTo(this.map);
            }
        })
        .catch(error=>{
            //Implement
        })
    }

    ngOnInit(){
        console.log('Entra');
    }

    reloadComponent() {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/sample']);
    }

    async ngAfterViewInit(){
        await this.markerService.sourceMap
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(source=>{
            let lastsource = this.serverMap;
            //this.serverMap = source;
            console.log(this.sourceChange);
            console.log(source===this.serverMap);
            console.log(typeof this.serverMap === 'undefined');
            this.sourceChange = (source === this.serverMap || typeof this.serverMap !== 'undefined');
            this.serverMap = source;
            console.log(this.sourceChange);
            if(this.sourceChange){
                this.reloadComponent();
            }
           // console.log(source)
        })
        this.initMap(); //Inizialize Map
        this.loadMarkers();
        // setTimeout(() => {
        //     this.locate();
        // }, 2000);
        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', this.onLocationError);
        //L.control.mousePosition().addTo(this.map);
        this.onMark(); // Create Marker From Click Event
    }

    newMarker(lat,lon,action:string): Observable<any>
    {
        //console.log(lat,lon);
        this.dialogRef = this._matDialog.open(MarkerContactFormDialogComponent, {
            panelClass: 'marker-form-dialog',
            data      : {
                action: action,
                lat: lat,
                lon: lon,
            }
        });
        return this.dialogRef.afterClosed()

    }

    editMarker(data:any,marker:any){
        this.dialogRef = this._matDialog.open(MarkerContactFormDialogComponent, {
            height: '600px',
            width: '700px',
            panelClass: 'marker-form-dialog',
            data      : {
                action: 'edit',
                data: data
            }
        });

        //All files are salved in
        //'assets/app/assets/'
        this.dialogRef.afterClosed()
            .subscribe(async (response: any) => {
                if ( !response )
                {
                    return;
                }
                console.log(response)
                let form = response[1];
                let files = response[2];
                if(response[0] == "save"){
                    let imagesCarruselIds = [];
                    if(files.length>0){
                        await this.imageService.addImage(files)
                        .then((img)=>{
                            console.log(img);
                            let data = img['data'];
                            imagesCarruselIds = img
                            //dataCamp.carrusel = img;
                        });
                    }
                    this.markerService.updateMarker(data.id,form.value)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(async mark=>{
                        console.log(mark)
                        if(mark!==null){
                            if(imagesCarruselIds.length>0){
                               console.log("Asociate images ", imagesCarruselIds)
                                await this.markerService.asociateImages(imagesCarruselIds,mark.id)
                            }
                        }
                    }, error=>{
                        console.log(error);
                        alert("Something Wrong Happend!!!!")
                    });;
                    marker._popup.setContent(this.markerService.makePopup(form.value));

                }else{
                    this.markerService.deleteMarker(data.id);
                    this.map.removeLayer(marker)
                }

        });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
     toggleSidebar(name): void
     {
         this._fuseSidebarService.getSidebar(name).toggleOpen();
     }
}
