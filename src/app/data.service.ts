import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = environment.apiUrl;
  page = 1;
  
	constructor(private httpClient: HttpClient){
  }  
  
  cargarClientes(): Observable<any> {
		//console.log(page);
		return this.httpClient.get(this.url + '/clientes');
	}
}
