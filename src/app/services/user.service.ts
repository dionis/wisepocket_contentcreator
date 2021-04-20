import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';
import * as moment from 'moment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  token: any;
  constructor(private _http: HttpClient) {
    this.user = new User();
  }

  getUsers(): Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
        resolve(res.data);
      },reject)
    })
  }
  
  singUp(user): Promise<any>{
    return new Promise((resolve,reject)=>{
        this._http.post('http://localhost:1337/singUp',user).subscribe(res=>{
          resolve(res);
        },reject)
    })
  }

  login(user): Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.post('http://localhost:1337/singIn',{email:user.email,password:user.password},
      ).subscribe((res:any)=>{
        const expiresAt = moment().add(res.expiresIn,'second');
        localStorage.setItem('id_token', res.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
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
      this.user = null
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
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
    idparams.append('id',user_id);
    this._http.get('http://localhost:1337/user/getUserById/'+user_id, 
                  {params: idparams}).pipe(map((responseData:any) =>{
                      
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
                        return responseData;
                      }
                  })).subscribe(res=>{
                  },
                  error =>{
                    this.user = null;
                  })
  }

  getMyUser():User{
    console.log(this.user)
    return this.user;
  }
}
