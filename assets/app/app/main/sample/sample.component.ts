import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as spanish } from './i18n/es';
import * as L from 'leaflet' 
import { MarkerService } from '../../services/marker.service';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit, AfterViewInit
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


    serverMap: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private markerService: MarkerService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);
        this.serverMap = 'googleMap';
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
        //L.Marker.prototype.options.icon = this.iconDefault;
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
                subdomains:['mt0','mt1','mt2','mt3']
                //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              });
              break;
            case 'geoServer':
                tiles = L.tileLayer.wms(this.uris[1],{
                    layers: 'wisepocket:gis_osm_roads_free_1',
                    srs: "EPSG:4326",
                    height: 768,
                    width:330,
                    attribution: "CUBA"
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
       
        //console.log(mauseCoordinates)
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

    ngAfterViewInit(){
        this.initMap(); //Inizialize Map
        //L.control.mousePosition().addTo(this.map);
        this.newMarker(); // Create Marker From Click Event
    }
}
