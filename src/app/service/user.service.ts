import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly url = "http://localhost:8090";

  public loginUserFromRemote(user: any): Observable<any> {
    return this.http.post(this.url + '/auth', user);
  }

  public userRegistrationFromRemote(user: User): Observable<any> {
    return this.http.post(this.url + '/users', user);
  }

  loginUser(token: string, userName: string, userType:string) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userType", userType)
  }

  isLoggedIn() {
    let token = sessionStorage.getItem("token");
    console.log(token);
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("userType")
    return true;
  }

  getToken() {
    let token = sessionStorage.getItem("token");
    console.log(token);
    if (token == undefined || token === '' || token == null) {
      return null;
    } else {
      return token;
    }

  }
 
  getloginUserName() {
    let userName = sessionStorage.getItem('userName');
    if (userName == undefined || userName === '' || userName == null) {
      return "please!login";
    } else {
      return userName;
    }
  }
}
