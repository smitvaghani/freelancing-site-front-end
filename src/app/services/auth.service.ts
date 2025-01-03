import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser } from '../models/IUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri: string = `${environment.apiUrl}/user`;
  public roleAs!: string;
  public roleIsFreelancer!: boolean;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }
  registerUser(user: IUser) {
    let url = `${this.baseUri}/register`;
    return this.http.post(url, user);
  }
  loginUser(user: IUser) {
    let url = `${this.baseUri}/login`;
    return this.http.post(url, user);
  }
  isloggedUser() {
    const token = localStorage.getItem('token');
    if (token != null)
      return !this.jwtHelper.isTokenExpired(token);
    else
      return false;

  }
  loggedUser() {
    var token = localStorage.getItem('token');
    const obj = {
      token: token
    }
    let url = `${this.baseUri}/loggedUser`;
    return this.http.post(url, obj);
  }
  getRoleUser() {
    var token = localStorage.getItem('token');
    const obj = {
      token: token
    }
    let url = `${this.baseUri}/loggedUser`;
    return this.http.post(url, obj).pipe(
      map((res: any) => {
        if (res.status == 'ok') {
          return res.data.Role;
        }
      })
    )

  }
  resetPassword(newPassword: string) {
    let url = `${this.baseUri}/changePassword`;
    const data = {
      Password: newPassword,
      token: localStorage.getItem('token')
    }
    return this.http.post(url, data);
  }
  addDescription(data: any) {
    let url = `${this.baseUri}/addDescription`;
    return this.http.post(url, data);
  }
  addEducation(data: any) {
    let url = `${this.baseUri}/addEducation`;
    return this.http.post(url, data);
  }
  addCertificate(data: any) {
    let url = `${this.baseUri}/addCertificate`;
    return this.http.post(url, data);
  }
  addProfileImg(data: any) {
    let url = `${this.baseUri}/addProfileImg`;
    return this.http.post(url, data);
  }
  addCategory(data: any) {
    let url = `${this.baseUri}/addCategory`;
    return this.http.post(url, data);
  }

  getUser(id: string | null) {
    let url = `${this.baseUri}/getUser/` + id;
    return this.http.get(url);
  }
}
