import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-antecedentes',
  standalone: true,
  imports: [],
  templateUrl: './antecedentes.component.html',
  styleUrl: './antecedentes.component.css'
})
export class AntecedentesComponent {
  cuestioanrioAntecedentesForm:FormGroup;

  constructor(private fb: FormBuilder){
    this.cuestioanrioAntecedentesForm = this.fb.group ({
      'alergiasMedicamentosas':[''],
      'otrasAlergias':[''],
      'cardiovasculares':[''],
      'inmunologicos':[''],
      'infecciosos':[''],
      'cardiacos':[''],
      'neurologicos':[''],
      'endocrinoMetabolicos':[''],
      'digestivos':[''],
      'genitourinarios':[''],


    })
  }
}
