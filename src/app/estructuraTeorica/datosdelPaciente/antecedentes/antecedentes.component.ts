import { DatosCompartidosHistoriaClinicaService } from './../../../service/datos-compartidos-historia-clinica.service';
import { NgFor } from '@angular/common';
import { Component, ElementRef, input, OnInit, ViewChild, ChangeDetectionStrategy, computed, inject, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl, FormsModule } from '@angular/forms';
import { MedicamentosComponent } from '../../medicamentos/medicamentos.component';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, BehaviorSubject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-antecedentes',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MedicamentosComponent, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatChipsModule, MatIconModule],
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {
  cuestionarioAntecedentesForm: FormGroup;
  controlEnfermedades: FormControl;
  opcionesAntecedentes: any[] = [];
  private opcionesFiltradasAntecedentesMedicosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  opcionesFiltradasAntecedentesMedicos: Observable<any[]> = this.opcionesFiltradasAntecedentesMedicosSubject.asObservable();
  patologias: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private patologiaService: DatosCompartidosHistoriaClinicaService) {
    this.controlEnfermedades = this.fb.control('');
    this.cuestionarioAntecedentesForm = this.fb.group({
      enfermedades: this.controlEnfermedades
    });
  }

  ngOnInit() {
    this.cargarOpcionesAntecedentes();

    this.controlEnfermedades.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this._filter(value);
      });

    this.patologiaService.patologias$.subscribe((patologias) => {
      this.patologias = patologias;
    });
  }

  cargarOpcionesAntecedentes() {
    this.http.get<any[]>('cie-10.json').subscribe(data => {
      this.opcionesAntecedentes = data;
    });
  }

  private _filter(value: string): void {
    if (!value) {
      // Si el valor es null o undefined, emitimos todas las opciones
      this.opcionesFiltradasAntecedentesMedicosSubject.next(this.opcionesAntecedentes);
      return;
    }

    const filterValue = value.toLowerCase();

    const filteredOptions = this.opcionesAntecedentes.filter(option =>
      option && option.description && option.description.toLowerCase().includes(filterValue)
    );

    // Emitimos las opciones filtradas
    this.opcionesFiltradasAntecedentesMedicosSubject.next(filteredOptions);
  }

  agregarPatologia() {
    const patologia = this.cuestionarioAntecedentesForm.get('enfermedades')?.value;

    const enfermedad = `${patologia}`;

    console.log('Patologia guardada:', enfermedad); // Para ver el resultado correcto
    this.patologiaService.agregarPatologia(enfermedad);

    this.cuestionarioAntecedentesForm.reset();
  }

  eliminarPatologia(patologia: string) {
    this.patologiaService.eliminarPatologia(patologia);
  }
}
