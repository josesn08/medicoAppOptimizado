
import { FormularioEDACSComponent } from './../../estructuraTeorica/formularios/formulario-edacs/formulario-edacs.component';
import { FiliacionYAntecedentesComponent } from './../../estructuraTeorica/datosdelPaciente/filiacion-yantecedentes/filiacion-yantecedentes.component';
import { HistoriaClinica } from './../../model/historia-clinica';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, CommonModule, NgIf } from '@angular/common';
import { AntecedentesComponent } from "../../estructuraTeorica/datosdelPaciente/antecedentes/antecedentes.component";
import { DisneaComponent } from "../../estructuraTeorica/sintomasCardinales/disnea/disnea.component";
import { DatosCompartidosHistoriaClinicaService } from 'src/app/service/datos-compartidos-historia-clinica.service';


@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormularioEDACSComponent, FiliacionYAntecedentesComponent, AntecedentesComponent, DisneaComponent],
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
})
export class HistoriaClinicaComponent implements OnInit{
  motivoConsultaForm: FormGroup;
  historiaClinica: HistoriaClinica[];

  motivoConsultaSeleccionado: string ='';
  sexo: string ="";
  edad: number = 0;


  constructor(private fb: FormBuilder, private datosCompartidos: DatosCompartidosHistoriaClinicaService){
    this.motivoConsultaForm = this.fb.group({

      'motivoConsulta': ['']
    });

    this.historiaClinica = [{
      motivoConsulta:[
        'Dolor torácico',
        'Cefalea',
        'Disnea',
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

  ngOnInit() {
    // Suscríbete al Observable para obtener el sexo
    this.datosCompartidos.getSexo().subscribe((sexo) => {
      this.sexo = sexo;
    });
    this.datosCompartidos.getEdad().subscribe((edad) => {
      this.edad = edad;
    });
  }

  onSubmit(){


  }


}
