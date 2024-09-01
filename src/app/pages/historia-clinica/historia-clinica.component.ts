import { HistoriaClinica } from './../../model/historia-clinica';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';


@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  motivoConsultaForm: FormGroup;
  historiaClinica: HistoriaClinica[];
  mostrarCuestionarioEDACS: boolean;

  constructor(private fb: FormBuilder){
    this.motivoConsultaForm = this.fb.group({
      motivoConsulta: ['']
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
    const motivoConsultaSeleccionado = this.motivoConsultaForm.get('motivoConsulta')?.value;
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
