import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  // Laravel server
  server = 'http://authetication/';
  constructor(private http: Http) { }

  signup(username: string, email: string, password: string) {
    return this.http.post('http://authetication/api/user',
    {name: username, email: email, password: password},
    {headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' })});
  }

  signin(email: string, password: string) {
    return this.http.post('http://authetication/api/user/signin',
    { email: email, password: password},
    {headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' })})
    .map(
       (response: Response) => {
         const token = response.json().token;
         const base64Url = token.split('.')[1];
         const base64 = base64Url.replace('-', '+').replace('_', '/');
         return {token: token, decoded: JSON.parse(window.atob(base64))};
       })
       .do(
         tokenData => {
           localStorage.setItem('token', tokenData.token);
         }
       );
  }
}
