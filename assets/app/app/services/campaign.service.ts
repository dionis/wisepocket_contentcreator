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
  
  addCampaign(campaign:any){
    //.....
    return this._http.post(environment.sails_services_urlpath+":"+environment.sails_services_urlport+
    '/campaign/addCampaign',campaign).pipe(map(response=>{
      let campaignCreated = new Campaign();
      if(response['data'].length!==0){
        let data = response['data'];
        campaignCreated = data[0];
        return campaignCreated;
      }
    }))
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

  getCampaignUser(page:string,limit:string,sortCriteria:string): Observable<Campaign[]>{
    console.log('Page',page);
    console.log('Sort',sortCriteria);
    return this._http.get(
        environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/CampaignslistbyUser',
        {params:{'page': page,
                  'limit':limit,
                  'criteria': sortCriteria}})
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
          console.log(this.campaignsofUserTotal)
          return responseData;
        })
      )
  }
  getCampaign(id:string){
    return this._http.get(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/CampaignDetail',
      {params:{'_id':id}}
    ).pipe(map(responseData=>{
      if(responseData['data']){
        let campaign = new Campaign();
        campaign = responseData['data'];
        return campaign
      }else{
        return null;
      }
    }))
  }

  asociateImages(idImages: any[], id:string){
    const body = {
      id: id,
      images: idImages
    }
    return this._http.post(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/addImagesToCampaign',body)
      .pipe(map(responseData=>{
        if(responseData['data']){
          let campaign = new Campaign();
          campaign = responseData['data'];
          return campaign
        }else{
        return null;
      }
    })).toPromise();
  }
}
