import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  constructor(
    private _http: HttpClient
  ) {
    this.sourceMap = new BehaviorSubject('geoServer');
  }

  //Add Marker
  createMarker(e:any,data:any){
    return this._http.post(environment.sails_services_urlpath+":"+environment.sails_services_urlport+
    '/marker/create',data).toPromise()
    // .pipe(map(response=>{
    //   if(response['success']){
    //     return true;
    //   }else{
    //     return false
    //   }
    // }))
    // .subscribe(response=>{});
  }

  updateMarker(id:string,data:any){
    return this._http.patch(environment.sails_services_urlpath+":"+environment.sails_services_urlport+
    '/marker/update',
    data,
    {params:{'markerId': id}})
    .pipe(map(response=>{
      if(response['success']){
        return true;
      }else{
        return false
      }
    }))
    .subscribe(response=>{});
  }

  //DELETE MARKER
  deleteMarker(id:string){
    return this._http.delete(environment.sails_services_urlpath+":"+environment.sails_services_urlport+
    '/marker/delete',
    {params:{'markerId': id}})
    .pipe(map(response=>{
      if(response['success']){
        return true;
      }else{
        return false
      }
    }))
    .subscribe(response=>{});
  }

  //Get Markers From Api
  getAllMarkers(): Promise<any>{
    return this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+
    '/marker/get-all')
    .pipe(map((response:any)=>{
      let markers = [];
      for (let index = 0; index < response.data.length; index++) {
        markers.push(response.data[index]);
      }
      return markers;
    })).toPromise()
  }

  setSource(source:string){
    this.sourceMap.next(source);
  }
  getSource():Observable<string>{
    return this.sourceMap.asObservable();
  }

  makePopup(data:any):string{
    return `` +
      `<div>Titulo: ${ data.title }</div>` +
      `<div>Email: ${ data.email }</div>` +
      `<div>Web Site: ${ data.url }</div>`
  }
}