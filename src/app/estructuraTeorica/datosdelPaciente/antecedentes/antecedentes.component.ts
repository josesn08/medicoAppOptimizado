import { DatosCompartidosHistoriaClinicaService } from './../../../service/datos-compartidos-historia-clinica.service';
import { NgFor } from '@angular/common';
import { Component, ElementRef, input, OnInit, ViewChild, ChangeDetectionStrategy, computed, inject, model, Signal, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl, FormsModule } from '@angular/forms';
import { MedicamentosComponent } from '../../medicamentos/medicamentos.component';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { DiagnosticosService } from 'src/app/service/cie10.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-antecedentes',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgFor, ReactiveFormsModule, MedicamentosComponent, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, AsyncPipe, MatChipsModule, MatIconModule, InfiniteScrollModule],
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {
  enfermedades: any [] = [];
  enfermedadesForm:FormGroup;
  filteredEnfermedades!: Signal<any>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  enfermedadSeleccionada: any[] =[]
  announcer = inject(LiveAnnouncer)
  page = 1;


  constructor(
    private fb: FormBuilder,
    private diagnosticoService: DiagnosticosService,
    private datosService: DatosCompartidosHistoriaClinicaService,
    private http: HttpClient) {
    this.enfermedadesForm = this.fb.group({
      nombreEnfermedad: [''],
      enfermedadActual:[''],
      enfermedadesCompletas: [''],
    });

    // Sincronizar el FormControl con la señal
    this.enfermedadesForm.get('nombreEnfermedad')?.valueChanges
    .pipe(
      debounceTime(500), // Añade un retardo de 300ms después de que el usuario deja de escribir
    )
    .subscribe(value => {
      this.enfermedadesForm.get('enfermedadActual')?.setValue(value); // Actualiza correctamente la señal con el valor del input
    });

    // Sincronizar la señal con el FormControl
    this.enfermedadesForm.get('enfermedadActual')?.valueChanges.subscribe(value => {
      this.enfermedadesForm.get('nombreEnfermedad')?.setValue(value, { emitEvent: false });
    });

    this.loadMore();
  }

  get enfermedadesFiltradas(): any[] {
    return this.filteredEnfermedades(); // Aquí estás obteniendo el valor del Signal
  }

  ngOnInit() {

    // Cargar diagnósticos desde el backend
    this.diagnosticoService.getDiagnosticos().subscribe(data => {
      console.log('Datos recibidos:', data);
      if (data && Array.isArray(data.results)) {
          this.enfermedades = data.results;
      } else {
          console.error('La propiedad results no es un array:', data.results);
      }
    });


    // Filtrar las enfermedades según la entrada del usuario
    this.filteredEnfermedades = computed(() => {
      const enfermedadActual = this.enfermedadesForm.get('enfermedadActual')?.value?.toLowerCase() || '';
      console.log(enfermedadActual)
      return enfermedadActual
        ? this.enfermedades.filter(enfermedad =>
            enfermedad.descripcion && enfermedad.descripcion.toLowerCase().includes(enfermedadActual)
          )
        : this.enfermedades.slice();
    });

    console.log('Enfermedades filtradas:', this.filteredEnfermedades);


  }





  agregarEnfermedad() {
    const nombreEnfermedad = this.enfermedadesForm.get('nombreEnfermedad')?.value;

    if (nombreEnfermedad && !this.enfermedadSeleccionada.includes(nombreEnfermedad)) {
      this.enfermedadSeleccionada.push(nombreEnfermedad);
      this.datosService.agregarPatologia(nombreEnfermedad); // Enviar la enfermedad seleccionada al servicio
      this.enfermedadesForm.get('nombreEnfermedad')?.setValue(''); // Limpiar el campo de entrada
    }

    const nombreEnfermedadFormateado = Array.isArray(nombreEnfermedad)
      ? nombreEnfermedad.map(enfermedad => enfermedad.description).join(', ')
      : nombreEnfermedad;

    const enfermedad = `${nombreEnfermedadFormateado}`.toLowerCase();

    console.log('Enfermedad guardada:', nombreEnfermedadFormateado); // Para ver el resultado correcto
    this.datosService.agregarPatologia(nombreEnfermedadFormateado);

  }



  eliminarPatologia(enfermedad: any) {

    const index = this.enfermedadSeleccionada.indexOf(enfermedad);
    if (index >= 0){
      this.enfermedadSeleccionada.splice(index, 1);
    }


    this.datosService.eliminarPatologia(enfermedad);
  }

  seleccionarEnfermedad(event: MatAutocompleteSelectedEvent): void {
    const enfermedadSeleccionada = event.option.value;
    if (!this.enfermedadSeleccionada.includes(enfermedadSeleccionada.descipcion)) {
      this.enfermedadSeleccionada.push(enfermedadSeleccionada.descripcion);
    }
    this.enfermedadesForm.get('nombreEnfermedad')?.setValue(''); // Limpiar el input después de seleccionar

    console.log('la enfermedad seleccionada es:', enfermedadSeleccionada.descripcion)
  }

  loadMore() {
    this.http.get<any>(`http://87.219.176.13:8000/diagnosticos/?page=${this.page}`)
    .subscribe(
      data => {
        // Verifica que data.results exista y sea un array
        if (data && Array.isArray(data.results)) {
          this.enfermedades = [...this.enfermedades, ...data.results];
          this.page++;
        } else {
          console.error('La respuesta no contiene un array de resultados:', data);
        }
      },
      error => {
        console.error('Error loading data', error);
      }
    );
  }

  displayFn(enfermedad: any): string {
    return enfermedad ? `${enfermedad.description} (${enfermedad.Código})` : '';
  }

  trackByEnfermedad(index: number, enfermedad: any): string {
    return enfermedad.description; // O cualquier propiedad única que tenga cada elemento
  }



}

