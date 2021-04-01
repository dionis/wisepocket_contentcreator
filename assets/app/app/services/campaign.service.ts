import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyARecord } from 'dns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campaign } from '../models/campaign.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  
  public campaignsofUserTotal:number = 0;
  public campaignsTotal: number = 0;
  constructor(
    private _http: HttpClient) { }
  
  addCampaign(){
    //.....
  }

  fetchCampagins(pagina:string, limit:string){
    const params = new HttpParams();
    params.append('page',pagina);
    params.append('limit',limit);
    return this._http.get(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/Campaignslist',
      {params:{'page': pagina,'limit':limit}})
    .pipe(
      map((responseData:any)=>{
        let arrayCamps: any[] = [];
        if(responseData.length !== 0){
          arrayCamps = responseData['data'];
        }
        return arrayCamps;
      })
    )
    // .subscribe(campaigns=>{
    //   console.log(campaigns);
    // })
  }

  getCampaignUser(page:string,limit:string): Observable<Campaign[]>{
    console.log('Page',page)
    return this._http.get(
        environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/CampaignslistbyUser',
        {params:{'page': page,'limit':limit}})
        .pipe(
          map((responseData:any)=>{
            let arrayCamps: any[] = [];
            if(responseData.length !== 0){
              arrayCamps = responseData['data'];
            }
            this.campaignsofUserTotal = arrayCamps.length;
            return arrayCamps;
          })
        )
  }

  countAllCampaings(){
    return this._http.get(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+
      '/campaign/countall',
      )
      .pipe(
        map((responseData:any)=>{
          this.campaignsTotal = responseData['data'];
          return responseData;
        })
      )
  }
  countUserCampaigns(){
    return this._http.get(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+
      '/campaign/countUserCampaigns',
      )
      .pipe(
        map((responseData:any)=>{
          this.campaignsofUserTotal = responseData['data'];
          return responseData;
        })
      )
  }
}
