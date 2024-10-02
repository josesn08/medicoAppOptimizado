import { DatosCompartidosHistoriaClinicaService } from './../../service/datos-compartidos-historia-clinica.service';
import { FormGroup, FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {AsyncPipe} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CimaService } from 'src/app/service/cima.service';
import { HttpClientModule } from '@angular/common/http';
import { Medicamento, MedicamentoResponse } from 'src/app/model/medicamento.model';



@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,CommonModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, AsyncPipe, MatIconModule, MatButtonModule, MatDividerModule, HttpClientModule],
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})
export class MedicamentosComponent implements OnInit{
  medicamentos: Medicamento[] = [];
  medicamentosForm:FormGroup;
  presentaciones:string[]=[]
  filteredMedicamentos: Observable<any[]> | undefined;

  constructor(private fb: FormBuilder, private cimaService: CimaService , private medicamentoService: DatosCompartidosHistoriaClinicaService) {
    this.medicamentosForm = this.fb.group({
      nombreGenerico: [''],
      pastillasDesayuno: [],
      pastillasComida: [],
      pastillasMerienda: [],
      pastillasCena: []
    });
  }

  ngOnInit() {
    this.filteredMedicamentos = this.medicamentosForm.get('nombreGenerico')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

  }


  agregarMedicamento() {
    const nombreGenerico = this.medicamentosForm.get('nombreGenerico')?.value;
    const pastillasDesayuno = this.medicamentosForm.get('pastillasDesayuno')?.value;
    const pastillasComida = this.medicamentosForm.get('pastillasComida')?.value;
    const pastillasMerienda = this.medicamentosForm.get('pastillasMerienda')?.value;
    const pastillasCena = this.medicamentosForm.get('pastillasCena')?.value;

    const pastillas = [
      pastillasDesayuno ? `${pastillasDesayuno}` : '',
      pastillasComida ? `${pastillasComida}` : '',
      pastillasMerienda ? `${pastillasMerienda}` : '',
      pastillasCena ? `${pastillasCena}` : ''
    ].filter(Boolean).join(' - ');

    // Si medicamentos es un array de objetos, mapea las propiedades necesarias
    const nombreGenericoFormateado = Array.isArray(nombreGenerico)
      ? nombreGenerico.map(medicamento => medicamento.nombre).join(', ')
      : nombreGenerico;

    const medicamento = `${nombreGenericoFormateado} (${pastillas})`.toLowerCase();

    console.log('Medicamento guardado:', medicamento); // Para ver el resultado correcto
    this.medicamentoService.agregarMedicamento(medicamento);

    this.medicamentosForm.reset();
  }

  private _filter(value: string): Medicamento[] {
    const filterValue = value.toLowerCase();
    return this.medicamentos.filter(medicamento => medicamento.nombre.toLowerCase().includes(filterValue));
  }

  buscarMedicamentos(): void {
    const nombreGenerico = this.medicamentosForm.get('nombreGenerico')?.value;
    this.cimaService.buscarPorNombre(nombreGenerico).subscribe((response: MedicamentoResponse) => {
      this.medicamentos = response.resultados;  // Asignar los resultados a la lista de medicamentos
    });
  }

  cargarMedicamentos(condiciones: string) {
    this.cimaService.getMedicamentos(condiciones).subscribe(
      (response) => {
        this.medicamentos = response.resultados; // Asigna la propiedad 'resultados' al array de medicamentos
        console.log(this.medicamentos); // Verifica que ahora 'medicamentos' tiene el array de resultados
      },
      (error) => {
        console.error('Error al cargar medicamentos', error);
      }
    );
  }
}
