import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicamentoResponse } from '../model/medicamento.model'; // Importa las interfaces correctas

@Injectable({
  providedIn: 'root'
})
export class CimaService {
  private baseUrl = 'https://cima.aemps.es/cima/rest';

  constructor(private http: HttpClient) {}

  // Método para obtener medicamentos por condiciones
  getMedicamentos(conditions?: string): Observable<MedicamentoResponse> {
    const url = `${this.baseUrl}/medicamentos${conditions ? '?' + conditions : ''}`;
    return this.http.get<MedicamentoResponse>(url);
  }

  // Método para buscar medicamentos por nombre
  buscarPorNombre(nombreGenerico: string): Observable<MedicamentoResponse> {
    const url = `${this.baseUrl}/medicamentos?nombre=${nombreGenerico}`;
    return this.http.get<MedicamentoResponse>(url);
  }
}

