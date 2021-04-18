import { Injectable } from '@angular/core';
import * as L from 'leaflet'
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  sourceMap: BehaviorSubject<string>;
  private iconRetinaUrl = './leafleticons/marker-icon-2x.png';
  private iconUrl = './leafleticons/marker-icon.png';
  private shadowUrl = './leafleticons/marker-shadow.png';
  public iconDefault = L.icon({
    iconRetinaUrl:this.iconRetinaUrl,
    iconUrl: this.iconUrl,
    shadowUrl: this.shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
  constructor() {
    this.sourceMap = new BehaviorSubject('geoServer');
  }
  createMarker(e){
    return  L.marker([e.latlng.lat, e.latlng.lng],this.iconDefault)
  }

  setSource(source:string){
    this.sourceMap.next(source);
  }
  getSource():Observable<string>{
    return this.sourceMap.asObservable();
  }
}
