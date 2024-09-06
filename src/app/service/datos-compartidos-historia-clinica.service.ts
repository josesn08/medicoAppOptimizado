import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosHistoriaClinicaService {

  private edadObtenida: number = 0;
  private edadSubject = new BehaviorSubject<number>(0);
  private sexoSubject = new BehaviorSubject<string>('');

  // Método para establecer la edad
  setEdad(edad: number) {
    this.edadSubject.next(edad);
  }

  // Método para obtener la edad
  getEdad(): Observable<number> {
    return this.edadSubject.asObservable();
  }

  setSexo(sexo: string) {
    this.sexoSubject.next(sexo);
  }

  // Método para obtener la edad
  getSexo(): Observable<string> {
    return this.sexoSubject.asObservable();
  }

  constructor() {

  }
}
