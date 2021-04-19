import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SampleComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
    private map;
    private  uris = [
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        'http://localhost:8080/geoserver/wisepocket/wms'
    ];
    private iconRetinaUrl = './leafleticons/marker-icon-2x.png';
    private iconUrl = './leafleticons/marker-icon.png';
    private shadowUrl = './leafleticons/marker-shadow.png';
    private iconDefault;
    private current_position: number;
    private current_accuracy: number;
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;


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
        private _matDialog: MatDialog
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
        //L.Marker.prototype.options.icon = this.iconDefault;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.markerService.sourceMap
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(source=>{
            //this.serverMap = source;
            console.log(source)
            this.map.remove();
            this.initMap();
            //console.log(this.map)
        });
    }

    onLocationFound(e) {
        // if position defined, then remove the existing position marker and accuracy circle from the map
        if (this.current_position) {
            this.map.removeLayer(this.current_position);
            this.map.removeLayer(this.current_accuracy);
        }
  
        var radius = e.accuracy / 2;
  
        this.current_position = L.marker(e.latlng,this.markerService.iconDefault).addTo(this.map)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();
  
        this.current_accuracy = L.circle(e.latlng, radius).addTo(this.map);
      }

      onLocationError(e) {
        alert(e.message);
    }
    locate() {
        this.map.locate({setView: true, maxZoom: 16});
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
                tiles = L.tileLayer.wms('http://localhost:8080/geoserver/wisepocket/wms',{
                    layers: 'wisepocket:gis_osm_roads_free_1',
                    srs: "EPSG:4326",
                    height: 768,
                    width:330,
                    attribution: "CUBA"
                  });          
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
        this.map = L.map('map',{
            center: corner1,
            maxBounds: bonus,
            //crs: L.CRS.EPSG4326,
            zoom: 6
        });
        //console.log(tiles)
        tiles.addTo(this.map);
    }
    private newMarker(){
        if(this.map){
            this.map.on("click", e => {
                console.log(e.latlng); // get the coordinates
                this.markerService.createMarker(e).addTo(this.map); // add the marker onclick
            });
        }
    }

    ngOnInit(){
        
    }


    async ngAfterViewInit(){
        await this.markerService.sourceMap
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(source=>{
            this.serverMap = source;
           // console.log(source)
        })
        this.initMap(); //Inizialize Map
        setTimeout(() => {
            this.locate();
        }, 2000);
        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', this.onLocationError);
        //L.control.mousePosition().addTo(this.map);
        this.newMarker(); // Create Marker From Click Event
    }

    newContact(): void
    {
        // this.dialogRef = this._matDialog.open(GeopointsFormDialogComponent, {
        //     panelClass: 'contact-form-dialog',//ojo
        //     data      : {
        //         action: 'new'
        //     }
        // });

        // this.dialogRef.afterClosed()
        //     .subscribe((response: FormGroup) => {
        //         if ( !response )
        //         {
        //             return;
        //         }

        //        //this._contactsService.updateContact(response.getRawValue());
        //     });
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
