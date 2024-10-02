import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosHistoriaClinicaService {

  private edadObtenida: number = 0;
  private edadSubject = new BehaviorSubject<number>(0);
  private sexoSubject = new BehaviorSubject<string>('');
  private medicamentoSubject = new BehaviorSubject<string[]>([]);
  private patologiaSubject = new BehaviorSubject<string[]>([]);

  // Observable que otros componentes pueden suscribirse
  medicamentos$ = this.medicamentoSubject.asObservable();
  patologias$ = this.patologiaSubject.asObservable();

  // Función para actualizar los medicamentos
  agregarMedicamento(medicamento: string) {
    const medicamentosActuales = this.medicamentoSubject.getValue();
    medicamentosActuales.push(medicamento);
    this.medicamentoSubject.next(medicamentosActuales);
  }

  agregarPatologia(patologia: string) {
    const patologiasActuales = this.patologiaSubject.getValue();
    patologiasActuales.push(patologia);
    this.patologiaSubject.next(patologiasActuales);
  }

  eliminarPatologia(patologia: string) {
    const patologiasActuales = this.patologiaSubject.getValue();
    const index = patologiasActuales.indexOf(patologia);

    if (index > -1) {
      patologiasActuales.splice(index, 1); // Elimina la patología del array
      this.patologiaSubject.next(patologiasActuales); // Actualiza el Observable
    }
  }

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
