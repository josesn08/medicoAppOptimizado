import { HistoriaClinica } from './../../model/historia-clinica';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Paciente } from 'src/app/model/paciente';
import { CuestionarioEDACS } from 'src/app/model/cardiologia/dolorToracico/cuestionario-edacs';


@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  motivoConsultaForm: FormGroup;
  cuestionarioEDACSForm: FormGroup;

  historiaClinica: HistoriaClinica[];
  mostrarCuestionarioEDACS: boolean;
  pacienteHistoriaClinica: Paciente[];
  cuestionarioEDACS: CuestionarioEDACS[];

  constructor(private fb: FormBuilder){
    this.motivoConsultaForm = this.fb.group({
      historiaClinica: this.fb.group({
        motivoConsulta: ['']
      })
    });

    this.cuestionarioEDACSForm = this.fb.group({

    })

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

    this.pacienteHistoriaClinica = [{
      numeroHistoriaClinica:0,
      email:'',
      nombre:'',
      apellidos:'',
      calle:'',
      numDireccion:'',
      lugNacimiento:'',
      sexo:'',
      fechaNac: new Date,
      edad: 0,
      paisResidencia:'',
      telefono:0,
      profesion:'',


    }]

    this.cuestionarioEDACS = [{
      diaforesis:true,
      dolorIrradiado:true,
      dolorDigitoPresion:true,
      dolorInspiración:true,
      enfermedadCoronaria:['Enfermedad coronaria', '3 o mas factores de riesgo','Ninguna de las dos'],
      puntajeCuestionarioEDACS:0

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

  seleccionarSexoHombre(){
    this.pacienteHistoriaClinica[0].sexo='Hombre'
    const puntajePreguntaSexo = this.asignarPuntajePreguntaSexo()

    console.log(this.pacienteHistoriaClinica[0].sexo);
    console.log(puntajePreguntaSexo);

  }

  seleccionarMujer(){
    this.pacienteHistoriaClinica[0].sexo='Mujer'
    const puntajePreguntaSexo = this.asignarPuntajePreguntaSexo();

    console.log(this.pacienteHistoriaClinica[0].sexo);
    console.log(puntajePreguntaSexo);

  }

  seleccionarDiaforesis(){
    this.cuestionarioEDACS[0].diaforesis=true

    const puntajeDiaforesis = this.asignarPuntajeDiaforesis();
    console.log(puntajeDiaforesis);
  }

  asignarPuntajePregunta1(){

    if (this.pacienteHistoriaClinica[0].edad >= 18 && this.pacienteHistoriaClinica[0].edad <= 45) {
        return 2;
    } else if (this.pacienteHistoriaClinica[0].edad >= 46 && this.pacienteHistoriaClinica[0].edad <= 50) {
        return 4;
    } else if (this.pacienteHistoriaClinica[0].edad >= 51 && this.pacienteHistoriaClinica[0].edad <= 55) {
        return 6;
    } else if (this.pacienteHistoriaClinica[0].edad >= 56 && this.pacienteHistoriaClinica[0].edad <= 60) {
        return 8;
    } else if (this.pacienteHistoriaClinica[0].edad >= 61 && this.pacienteHistoriaClinica[0].edad <= 65) {
        return 10;
    } else if (this.pacienteHistoriaClinica[0].edad >= 66 && this.pacienteHistoriaClinica[0].edad <= 70) {
        return 12;this.pacienteHistoriaClinica[0].edad
    } else if (this.pacienteHistoriaClinica[0].edad >= 71 && this.pacienteHistoriaClinica[0].edad <= 75) {
        return 14;
    } else if (this.pacienteHistoriaClinica[0].edad >= 76 && this.pacienteHistoriaClinica[0].edad <= 80) {
        return 16;
    } else if (this.pacienteHistoriaClinica[0].edad >= 81 && this.pacienteHistoriaClinica[0].edad <= 85) {
        return 18;
    } else if (this.pacienteHistoriaClinica[0].edad >= 86) {
        return 20;
    }
    return 0;


  }

  asignarPuntajePreguntaSexo(){
    if (this.pacienteHistoriaClinica[0].sexo === 'Mujer'){
      return 6;
    }
    else{
      return 0;
    }
  }

  asignarPuntajeDiaforesis(){
    if(this.cuestionarioEDACS[0].diaforesis === true){
      return 3;
    }
    else{
      return 0;
    }
  }

  seleccionarEdad(event: Event){
    var edadSeleccionada = event.target as HTMLInputElement;
    this.pacienteHistoriaClinica[0].edad= Number(edadSeleccionada.value);
    const puntajePregunta1 = this.asignarPuntajePregunta1();

    console.log(this.pacienteHistoriaClinica[0].edad)
    console.log(puntajePregunta1)
  }
}
