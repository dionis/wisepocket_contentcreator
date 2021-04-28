import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
//import { FileUploadService } from 'assets/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient,
    private sanitizer:DomSanitizer) { }
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

  getImage(image:any) {
    //const ext = image.path;
    const name = image.titulo;
    let ext = name.split('.')[1];
    //let img = new Image()
    //console.log();
    //image = new ArrayBuffer()
    return this._http
      .get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+
      '/downloadImage', {
        params:{'_id': image.id},
        //responseType: "arraybuffer"
      })
      .pipe(
        map((response:any) => {
          // console.log(response)
          // let base64String = btoa(new Uint8Array(response)
          // .reduce((data, byte) => data + String.fromCharCode(byte), ''));
          // console.log(base64String);
          const imageBlob = this.dataUriToBlob(response,ext);
          // let encoded = window.btoa(response);
          // const byteArray = new Uint8Array(atob(encoded).split('').map(char => char.charCodeAt(0)));
          // const blob = new Blob([byteArray], {type:'image/'+ext});
          return imageBlob;
          //return this.sanitizer.bypassSecurityTrustResourceUrl(response);
        })
      );
  }

  getImageFromAssets(image:any) {
    const name = image.titulo;
    let ext = name.split('.')[1];
    return this._http
      .get('assets/images/api/'+name, {
        responseType: "arraybuffer"
      })
      .pipe(
        map(response => {
          console.log(response)
          return response;
        })
      );
  }

  dataUriToBlob(dataUri,ext){
    let converted = this.toBinary(dataUri);
    let encoded = window.btoa(converted);
    const byteStr = window.atob(encoded);
    const arrayBuff = new ArrayBuffer(byteStr.length);
    const init8Array = new Uint8Array(arrayBuff);
    for (let index = 0; index < byteStr.length; index++) {
      init8Array[index] = byteStr.charCodeAt(index);
      
    }
    const blob = new Blob([init8Array],{type: 'image/'+ext});
    return blob;
  }
  // Convertir cadena Unicode a cadena donde cada
  // elemento 16-bit ocupe solo un byte
  toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
  }
  
  // Recodificar cadena original
  fromBinary(binary) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  }
  
}
