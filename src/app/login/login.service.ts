import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.apiUrl;

  constructor(private router: Router,
    private httpClient: HttpClient) { }

  login(user: string, password: string): Observable<any> {

    /*var response = this.httpClient.get(this.url + '/usuarios/' + user + '/' + password).catch(e => {
      if (e.status === 401) {
        return response = of([{ 'result': 'false' }]);;
      }
      // do any other checking for statuses here
    });

    //console.log(response);
    return response;*/
    return this.httpClient.get(this.url + '/usuarios/' + user + '/' + password);
  }

  isAutenticado() {
    const token = localStorage.getItem("auth");
    if (localStorage.getItem("auth") == 'true') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.setAuth("false");
    this.router.navigate(['/login']);
  }

  setToken(token): void {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setAuth(auth): void {
    localStorage.setItem("auth", auth);
  }

  getAuth() {
    return localStorage.getItem("auth");
  }
}
