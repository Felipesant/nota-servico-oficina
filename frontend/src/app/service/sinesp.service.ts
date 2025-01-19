import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import * as sinespApi from 'sinesp-api';
// const sinespApi = require('sinesp-api');

@Injectable({
  providedIn: 'root'
})
export class ConsultaPlacaService {

  constructor(private http: HttpClient) {}

  getPlaca(placa: string): Observable<any> {
    return this.http.get(`/local-api/consulta/${placa}`);
  }
}
