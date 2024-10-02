import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cie10Service {
  private apiUrl = 'https://raw.githubusercontent.com/verasativa/CIE-10/main/cie10.json';  // URL del repositorio con los datos

  constructor(private http: HttpClient) {}

  getDiagnosticos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
