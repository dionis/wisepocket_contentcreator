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
    //if(typeof(files,) )
    formdata.append('files',files);
    for (let index = 0; index < files.length; index++) {
      console.log(files[index]);
      formdata.append('files',files[index]);
    }
    return this._http.post(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/addImg',
      formdata)
  }
}
