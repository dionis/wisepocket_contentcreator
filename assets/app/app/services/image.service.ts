import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient,
              private fileService: FileUploadService) { }
  addImage(files){
    let formdata = new FormData();
    //if(typeof(files,) )
    //formdata.append('files',files);
    for (let index = 0; index < files.length; index++) {
      console.log(files[index]);
      formdata.append('files',files[index]);
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
