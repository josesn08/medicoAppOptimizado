import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MedicamentosComponent } from '../../medicamentos/medicamentos.component';

@Component({
  selector: 'app-antecedentes',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MedicamentosComponent],
  templateUrl: './antecedentes.component.html',
  styleUrl: './antecedentes.component.css'
})
export class AntecedentesComponent {
  cuestionarioAntecedentesForm:FormGroup;
  listaOpciones=['Alergias Medicamentosas',
      'Otras Alergias',
      'Antecedentes Cardiovasculares',
      'Inmunologicos',
      'Infecciosos',
      'Cardiacos',
      'Neurologicos',
      'Endocrino Metabolicos',
      'Digestivos',
      'Genitourinarios'];
  controles:(string|number|null)[]=[]
  key:string=''

  constructor(private fb: FormBuilder){
    this.cuestionarioAntecedentesForm = this.fb.group ({
      opciones: this.fb.array(this.listaOpciones.map(() => false))
    })
  }

  get opciones() {
    return this.cuestionarioAntecedentesForm.get('opciones') as FormArray;
  }


}
