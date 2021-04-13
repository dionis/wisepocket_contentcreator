import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient,) { }
  addImage(files){
    console.log(files)
    let formdata = new FormData();
    if(files instanceof Array){
      for (let index = 0; index < files.length; index++) {
        console.log(files[index]);
        formdata.append('files',files[index]);
      }
    }else{
      formdata.append('files',files);
    }
    return this._http.post(
      environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/addImg',
      formdata).pipe(map(responseData=>{
        let ids = [];
        if(responseData['data']){
          responseData['data'].forEach(element => {
            ids.push(element.id)
          });
        }
        return ids;
      })).toPromise()
  }
}
