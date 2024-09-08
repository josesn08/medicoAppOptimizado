
import { FormularioEDACSComponent } from './../../estructuraTeorica/formularios/formulario-edacs/formulario-edacs.component';
import { FiliacionYAntecedentesComponent } from './../../estructuraTeorica/datosdelPaciente/filiacion-yantecedentes/filiacion-yantecedentes.component';
import { HistoriaClinica } from './../../model/historia-clinica';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, CommonModule, NgIf } from '@angular/common';
import { AntecedentesComponent } from "../../estructuraTeorica/datosdelPaciente/antecedentes/antecedentes.component";



@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormularioEDACSComponent, FiliacionYAntecedentesComponent, AntecedentesComponent],
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
})
export class HistoriaClinicaComponent {
  motivoConsultaForm: FormGroup;
  historiaClinica: HistoriaClinica[];

  motivoConsultaSeleccionado: string ='';


  constructor(private fb: FormBuilder){
    this.motivoConsultaForm = this.fb.group({

      'motivoConsulta': ['']
    });

    this.historiaClinica = [{
      motivoConsulta:[
        'Dolor torácico',
        'Cefalea',
        'Malestar general'
      ],

      antecedentes:[

      ],

      enfermedadActual:[

      ],

      examenFisico:[

      ],

      diagnostico:'',

      pruebasComplementarias:[

      ],

      tratamiento:[

      ]
    }]



  }

  onSubmit(){


  }


}
