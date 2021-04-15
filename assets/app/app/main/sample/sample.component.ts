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
    }

    private initMap(){
        let corner1 = L.latLng(19.8351702,-84.9514723);
        let corner2 = L.latLng(23.2431588,-74.1343019);
        const bonus = L.latLngBounds(corner1, corner2);
        this.map = L.map('map',{
            center: corner1,
            maxBounds: bonus,
            crs: L.CRS.EPSG4326,
            zoom: 6
        });
        const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
            //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
        
        const tiles2 = L.tileLayer.wms('http://localhost:8080/geoserver/wisepocket/wms',{
            layers: 'wisepocket:gis_osm_roads_free_1',
            height: 768,
            width:330,
            attribution: "CUBA"
          });
          console.log(tiles2);
          tiles.addTo(this.map);
          console.log(this.map)
    }
    ngOnInit(){

    }

    ngAfterViewInit(){
        this.initMap();
    }
}
