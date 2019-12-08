import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/clientes.component';
import { Area } from './areas/areas.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = environment.apiUrl;
  page = 1;

  constructor(private httpClient: HttpClient) {
  }

  cargarClientes(): Observable<any> {
    //console.log(page);
    return this.httpClient.get(this.url + '/clientes');
  }

  actualizarCliente(cliente: Cliente, idCliente: number): Observable<any> {
    //console.log(cliente);
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.url + '/clientes/' + idCliente, cliente, { headers });
  }

  insertarCliente(cliente: Cliente): Observable<any> {
    //console.log(cliente);
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.url + '/clientes', cliente, { headers });
  }

  eliminarCliente(idCliente: number): Observable<any> {
    return this.httpClient.delete(this.url + '/clientes/'+idCliente);
  }

  cargarAreas(): Observable<any> {
    return this.httpClient.get(this.url + '/areas');
  }

  actualizarArea(area: Area, idArea: number): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.url + '/areas/' + idArea, area, { headers });
  }

  insertarArea(area: Area): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.url + '/areas', area, { headers });
  }

  eliminarArea(idArea: number): Observable<any> {
    return this.httpClient.delete(this.url + '/areas/'+idArea);
  }
}
