import { NgFor } from '@angular/common';
import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl, FormsModule } from '@angular/forms';
import { MedicamentosComponent } from '../../medicamentos/medicamentos.component';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-antecedentes',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MedicamentosComponent, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './antecedentes.component.html',
  styleUrl: './antecedentes.component.css'
})
export class AntecedentesComponent {
  ;
  cuestionarioAntecedentesForm:FormGroup;
  cuestionarioAntecedentesQuirurgicosForm: FormGroup
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
  patologiaQuirurgicaEspecialidad: string[] = ['Neurocirugía', 'Otorrinolaringología', 'Oftalmología', 'Ginecoobstetricia','Cirugía general', 'Ortopedia', 'Urología', 'Cirugía vascular', 'Cirugía Cardica', 'Maxilofacial', 'Cirugía Plastica', 'Dermatología']
  patologiaNeumologica: string[] = ['EPOC', 'Asma', 'Hipertensión Pulmonar / CorPulmonale', 'Enfermedad intersticial del pulmón', 'Embolismo pulmonar previo', 'Neumotórax previo(s)', 'Neoplasia Pulmonar', 'Pleuritis', 'Derrame pleural previo', 'Disfunción de las cuerdas vocales', 'Parálisis de las cuerdas vocales'];
  patologiaCardiaca: string[] = ['Insuficiencia cardiaca congestiva', 'Isquemia miocardica', 'Infarto miocardico previo', 'Cardiomiopatía', 'Valvulopatía', 'Pericarditis a repetición', 'Arritmia cardiaca'];
  patologiaEndocrinoMetabolica: string[] = ['Obesidad', 'Acidosis', 'Hipotiroidismo', 'Hipertiroidismo'];
  patologiaPsiquiatrica: string[] = ['Ansiedad'];
  patologiaDigestiva: string[] = ['Reflujo gastroesofágico', 'Cirosis hepática', 'Ascitis'];
  patologiaGonecologica: string[] = ['Embarazo'];
  patologiaHematologica: string[] = ['Anemia'];
  patologiaNeurologica: string[] = ['Miastenia Gravis', 'Esclerosis lateral amiotrófica'];
  patologiaRenal: string[] = ['Insuficiencia Renal'];
  opcionesFiltradasAntecedentesMedicos!: Observable<string[]>;
  opcionesFiltradasAntecedentesQuirurgicos!: Observable<String[]> ;
  controlEnfermedades = new FormControl();


  constructor(private fb: FormBuilder){
    this.cuestionarioAntecedentesForm = this.fb.group ({
      opciones: ['']

    }),

    this.cuestionarioAntecedentesQuirurgicosForm = this.fb.group({
      tipoEspecialidad: [''],
      patologia: [''],
      anoCirugia: ['']
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.opcionesFiltradasAntecedentesMedicos = this.controlEnfermedades.valueChanges.pipe(startWith(''), map(value => this._filter(value || '')));

    console.log(this.cuestionarioAntecedentesForm.get('opciones')?.value);


    this.opcionesFiltradasAntecedentesQuirurgicos = this.controlEnfermedades.valueChanges.pipe(startWith(''), map(value => this._filter(value || '')));



  }

  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase();
    return this.listaOpciones.filter(option => option.toLowerCase().includes(filterValue));
  }
}
