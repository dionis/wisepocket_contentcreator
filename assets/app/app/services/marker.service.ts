import { Injectable } from '@angular/core';
import * as L from 'leaflet'

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private iconRetinaUrl = './leafleticons/marker-icon-2x.png';
  private iconUrl = './leafleticons/marker-icon.png';
  private shadowUrl = './leafleticons/marker-shadow.png';
  private iconDefault = L.icon({
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

  }
  createMarker(e){
    return  L.marker([e.latlng.lat, e.latlng.lng],this.iconDefault)
  }
}
