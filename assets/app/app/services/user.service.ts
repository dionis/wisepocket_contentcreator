import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  token: any;
  constructor(private _http: HttpClient) {
    this.user = new User();
  }
//https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
  getUsers(): Promise<any>{
    return new Promise((resolve,reject)=>{
      environment.sails_services_urlpath
      // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
      //   resolve(res.data);
      // },reject)

      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/users').subscribe((res:any)=>{
        resolve(res.data);
      },reject)
    })
  }

  singUp(user): Promise<any>{
    return new Promise((resolve,reject)=>{


        this._http.post(  environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/singUp',user).subscribe(res=>{
          resolve(res);
        },reject)
    })
  }

  login(user): Promise<any>{
    return new Promise((resolve,reject)=>{
      console.log("Url to call " + environment.sails_services_urlpath+":"+environment.sails_services_urlport)
      this._http.post(  environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/singIn',{email:user.email,password:user.password},
      ).subscribe((res:any)=>{
        const expiresAt = moment().add(res.expiresIn,'second');
        localStorage.setItem('id_token', res.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        this.user = new User();
        this.getUserById();
        resolve(res);
      },error =>{
        reject(error);
      })
    });
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      this.user = null;
  }

  public isLoggedIn() {
      console.log(this.user, moment().isBefore(this.getExpiration()) );
      return this.user && moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
  getUserById(){
    const jwt = new JwtHelperService();
    let token =  jwt.decodeToken(localStorage.getItem('id_token'));
    let user_id = token._id;
    console.log(user_id);
    let idparams = new HttpParams();
    this._http.get(  environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/user/getUserById/',
                  {params: idparams.append('_id',user_id)}).pipe(map((responseData:any) =>{

                      if(responseData.data){
                        console.log(responseData.data.name)
                        this.user.name = responseData.data.name;
                        this.user.email = responseData.data.email;
                        this.user.phone = responseData.data.phone;
                        this.user.organization = responseData.data.organization;
                        this.user.cargo = responseData.data.cargo;
                        console.log(this.user);
                        return this.user;
                      }else{
                        console.log(responseData);
                        return responseData;
                      }
                  })).subscribe(res=>{
                  },
                  error =>{
                    this.user = null;
                  })
  }

  getMyUser():User{
    console.log(localStorage.getItem('id_token'));
    console.log(this.user)
    return this.user;
  }
}
