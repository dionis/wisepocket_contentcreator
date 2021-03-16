import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _http: HttpClient) { 
    
  }

  upload_files(files){
    const formdata = new FormData();
    for (let index = 0; index < files.length; index++) {
      console.log(files[index]);
      formdata.append('campIcon',files[index]);
    }
    this._http.post(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/uploadFile',formdata)
    .subscribe(res=>{
      console.log(res);
    })
  }
}
