import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as spanish } from './i18n/es';
import * as L from 'leaflet' 

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
    ]


    serverMap: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);
        this.serverMap = 'geoServer';
    }

    private initMap(){
        let tiles;
        let corner1 = L.latLng(19.8351702,-84.9514723);
        let corner2 = L.latLng(23.2431588,-74.1343019);
        let bonus = L.latLngBounds(corner1, corner2);
        
        switch (this.serverMap) { 
            case 'googleMap':
                let x,y,z;
                //x = 18; y = 29; z= 6
                console.log(this.uris[0])
                corner1 = L.latLng(19.8351702,-84.9514723);
                corner2 = L.latLng(23.2431588,-74.1343019);
                tiles = L.tileLayer(`http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`,{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
                //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              });
              break;
            case 'geoServer':
                corner1 = L.latLng(19.8351702,-84.9514723);
                corner2 = L.latLng(23.2431588,-74.1343019);
                bonus = L.latLngBounds(corner1, corner2);
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
        console.log(tiles)
        tiles.addTo(this.map);
       
        //console.log(mauseCoordinates)
    }
    ngOnInit(){

    }

    ngAfterViewInit(){
        this.initMap();
        L.control.mousePosition().addTo(this.map);
    }
}
