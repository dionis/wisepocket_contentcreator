import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { HttpClient,HttpHeaders } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class GamesService {


  constructor(private http: HttpClient) {

  }



editGame(identificador):Observable<any>{
  return this.http.patch(  environment.sails_services_urlpath +
    ":" +
    environment.sails_services_urlport +
    "/game/edit",
  { params: { id: identificador.id } }
);
}
deleteGame(identificador):Observable<any>{
  return this.http.delete("http://localhost:1337/game/"+ identificador);
}


addGame(game:any){
let json = JSON.stringify(game);
let headers = new HttpHeaders().set('Content-Type','aplicacion/json');
return this.http.post("http://localhost:1337/game",json,{headers:headers});

}

obtenerList():Observable<any>{
return this.http.get("http://localhost:1337/game");
}


}

