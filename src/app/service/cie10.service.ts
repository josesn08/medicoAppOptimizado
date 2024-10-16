// src/app/service/cie10.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticoResponse } from '../model/diagnostico-response';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticosService {
  private apiUrl = 'http://http://87.219.176.13:8000/diagnosticos/'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  getDiagnosticos(): Observable<DiagnosticoResponse> {
    return this.http.get<DiagnosticoResponse>('http://http://87.219.176.13:8000/diagnosticos/');
  }
}
