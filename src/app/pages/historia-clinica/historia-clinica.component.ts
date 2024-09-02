import { HistoriaClinica } from './../../model/historia-clinica';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Paciente } from 'src/app/model/paciente';
import { CuestionarioEDACS } from 'src/app/model/cardiologia/dolorToracico/cuestionario-edacs';
import { FormularioEDACSComponent } from "../../estructuraTeorica/formularios/formulario-edacs/formulario-edacs.component";


@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule, FormularioEDACSComponent],
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  motivoConsultaForm: FormGroup;
  historiaClinica: HistoriaClinica[];
  mostrarCuestionarioEDACS: boolean;

  constructor(private fb: FormBuilder){
    this.motivoConsultaForm = this.fb.group({
      historiaClinica: this.fb.group({
        motivoConsulta: ['']
      })
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

    this.mostrarCuestionarioEDACS = false

  }

  onSubmit(){
    const motivoConsultaSeleccionado = this.motivoConsultaForm.get('historiaClinica[0].motivoConsulta')?.value;

  }

  onCambioMotivoConsulta(event: Event){
    const elementoSeleccionado = event.target as HTMLSelectElement;
    const valorSeleccionado = elementoSeleccionado.value;

    if (valorSeleccionado == 'Dolor torácico'){
      this.mostrarCuestionarioEDACS = true
    }
    else{
      this.mostrarCuestionarioEDACS = false
    }

  }


}
