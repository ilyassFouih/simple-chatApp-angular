import { Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUser: User = null
  options:HttpHeaders = new HttpHeaders().set("Content-Type","application/json")
  
  
  constructor(private http: HttpClient) {
    
   }

  checkUser(userName) {
    return this.http.get(environment.backEndUrl + "/" + userName)
  }
  signUp(user: User) {
    return this.http.post(environment.backEndUrl, JSON.stringify(user),{headers:this.options})
  }
}
