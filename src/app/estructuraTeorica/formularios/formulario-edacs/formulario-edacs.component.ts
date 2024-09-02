import { HistoriaClinica } from '../../../model/historia-clinica';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Paciente } from 'src/app/model/paciente';
import { CuestionarioEDACS } from 'src/app/model/cardiologia/dolorToracico/cuestionario-edacs';


@Component({
  selector: 'app-formulario-edacs',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './formulario-edacs.component.html',
  styleUrl: './formulario-edacs.component.css'
})
export class FormularioEDACSComponent {
  cuestionarioEDACSForm: FormGroup;
  antecedentesCardiovascularesForm: FormGroup;
  mostrarCuestionarioEDACS: boolean;
  cuestionarioEDACS: CuestionarioEDACS[];
  mostrarCuestionarioACV: boolean = false;
  numeroACVSeleccionados: number = 0;
  historiaClinica: HistoriaClinica[];
  pacienteHistoriaClinica: Paciente[];

  constructor(private fb: FormBuilder){
    this.antecedentesCardiovascularesForm = this.fb.group({
      btncheckACV1: [false],
      btncheckACV2: [false],
      btncheckACV3: [false],
      btncheckACV4: [false],
      btncheckACV5: [false],
    });

    this.cuestionarioEDACSForm = this.fb.group({

    });

    this.cuestionarioEDACS = [{
      diaforesis:true,
      dolorIrradiado:true,
      dolorDigitoPresion:true,
      dolorInspiracion:true,
      enfermedadCoronaria:false,
      antecedentesCV: false,
      puntajeCuestionarioEDACS:0,
      puntajeDiaforesis:0,
      puntajeDolorIrradiado:0,
      puntajeDolorInspiracion:0,
      puntajeDolorDigitoPresion:0,
      puntajeCoronarioYFRCV:0,
      puntajeSexo: 0,
      puntajeEdad: 0,
    }]

    this.mostrarCuestionarioEDACS = false

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

  }
  antecedentesCVResp(){
    const ACVSeleccionados = this.antecedentesCardiovascularesForm.value;
    console.log('Formulario enviado:', ACVSeleccionados);
  }

  public antecedentesCVChange(){
    const formValues = this.antecedentesCardiovascularesForm.value;
    this.numeroACVSeleccionados = Object.values(formValues).filter(value => value === true).length;
    console.log('Número de inputs seleccionados:', this.numeroACVSeleccionados);

    this.cuestionarioEDACS[0].puntajeCoronarioYFRCV = this.asignarPuntajeAntecedentesCOronariosYFRCV();
    console.log(this.cuestionarioEDACS[0].puntajeCoronarioYFRCV);
  }


  seleccionarSexoHombre(){
    this.pacienteHistoriaClinica[0].sexo='Hombre'
    this.cuestionarioEDACS[0].puntajeSexo = this.asignarPuntajePreguntaSexo()

    console.log(this.pacienteHistoriaClinica[0].sexo);
    console.log(this.cuestionarioEDACS[0].puntajeSexo);

  }

  seleccionarMujer(){
    this.pacienteHistoriaClinica[0].sexo='Mujer'
    this.cuestionarioEDACS[0].puntajeSexo = this.asignarPuntajePreguntaSexo();

    console.log(this.pacienteHistoriaClinica[0].sexo);
    console.log(this.cuestionarioEDACS[0].puntajeSexo);

  }

  seleccionarDiaforesis(){
    this.cuestionarioEDACS[0].diaforesis=true

    this.cuestionarioEDACS[0].puntajeDiaforesis = this.asignarPuntajeDiaforesis();
    console.log(this.cuestionarioEDACS[0].puntajeDiaforesis);
  }
  deseleccionarDiaforesis(){
    this.cuestionarioEDACS[0].diaforesis = false;

    this.cuestionarioEDACS[0].puntajeDiaforesis  = this.asignarPuntajeDiaforesis();
    console.log(this.cuestionarioEDACS[0].puntajeDiaforesis);
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
    this.cuestionarioEDACS[0].puntajeEdad = this.asignarPuntajePregunta1();

    console.log(this.pacienteHistoriaClinica[0].edad)
    console.log(this.cuestionarioEDACS[0].puntajeEdad)

    if(this.pacienteHistoriaClinica[0].edad <= 50 && this.pacienteHistoriaClinica[0].edad >= 18){
      this.mostrarCuestionarioACV = true;
    }
    else{
      this.mostrarCuestionarioACV = false;
    }
  }

  seleccionarIrradiacion(){
    this.cuestionarioEDACS[0].dolorIrradiado=true

    this.cuestionarioEDACS[0].puntajeDolorIrradiado  = this.asignarPuntajeDolorIrradiado();
    console.log(this.cuestionarioEDACS[0].puntajeDolorIrradiado);
  }

  deseleccionarIrradiacion(){
    this.cuestionarioEDACS[0].dolorIrradiado=false

    this.cuestionarioEDACS[0].puntajeDolorIrradiado  = this.asignarPuntajeDolorIrradiado();
    console.log(this.cuestionarioEDACS[0].puntajeDolorIrradiado);
  }

  asignarPuntajeDolorIrradiado(){
    if(this.cuestionarioEDACS[0].dolorIrradiado === true){
      return 5;
    }
    else{
      return 0;
    }
  }

  seleccionarDolorInspiracion(){
    this.cuestionarioEDACS[0].dolorInspiracion=true

    this.cuestionarioEDACS[0].puntajeDolorInspiracion  = this.asignarPuntajeDolorInspiracion();
    console.log(this.cuestionarioEDACS[0].puntajeDolorInspiracion);
  }

  deseleccionarDolorInspiracion(){
    this.cuestionarioEDACS[0].dolorInspiracion=false

    this.cuestionarioEDACS[0].puntajeDolorInspiracion  = this.asignarPuntajeDolorInspiracion();
    console.log(this.cuestionarioEDACS[0].puntajeDolorInspiracion);
  }

  asignarPuntajeDolorInspiracion(){
    if(this.cuestionarioEDACS[0].dolorInspiracion === true){
      return -4;
    }
    else{
      return 0;
    }
  }

  seleccionarDolorDigitoPresion(){
    this.cuestionarioEDACS[0].dolorDigitoPresion=true

    this.cuestionarioEDACS[0].puntajeDolorDigitoPresion  = this.asignarPuntajeDolorDigitoPresion();
    console.log(this.cuestionarioEDACS[0].puntajeDolorDigitoPresion);
  }

  asignarPuntajeDolorDigitoPresion(){
    if(this.cuestionarioEDACS[0].dolorDigitoPresion === true){
      return -6;
    }
    else{
      return 0;
    }
  }
  deseleccionarDolorDigitoPresion(){
    this.cuestionarioEDACS[0].dolorDigitoPresion = false;

    this.cuestionarioEDACS[0].puntajeDolorDigitoPresion  = this.asignarPuntajeDolorDigitoPresion();
    console.log(this.cuestionarioEDACS[0].puntajeDolorDigitoPresion);
  }


  seleccionarAntecedentesCoronarios(){
    this.cuestionarioEDACS[0].enfermedadCoronaria=true

    this.cuestionarioEDACS[0].puntajeCoronarioYFRCV  = this.asignarPuntajeAntecedentesCOronariosYFRCV();
    console.log(this.cuestionarioEDACS[0].puntajeCoronarioYFRCV);
  }


  deseleccionarAntecedentesCoronarios(){
    this.cuestionarioEDACS[0].enfermedadCoronaria=false

    this.cuestionarioEDACS[0].puntajeCoronarioYFRCV  = this.asignarPuntajeAntecedentesCOronariosYFRCV();
    console.log(this.cuestionarioEDACS[0].puntajeCoronarioYFRCV);
  }


  asignarPuntajeAntecedentesCOronariosYFRCV(){
    if(this.cuestionarioEDACS[0].enfermedadCoronaria === true || this.numeroACVSeleccionados >= 3){
      return 4;
    }
    else{
      return 0;
    }
  }

  calcularPuntajeEDACS(){
    const puntajeTotalEDACS = this.cuestionarioEDACS[0].puntajeCoronarioYFRCV + this.cuestionarioEDACS[0].puntajeDiaforesis + this.cuestionarioEDACS[0].puntajeDolorDigitoPresion + this.cuestionarioEDACS[0].puntajeDolorInspiracion + this.cuestionarioEDACS[0].puntajeDolorIrradiado + this.cuestionarioEDACS[0].puntajeEdad + this.cuestionarioEDACS[0].puntajeSexo;

    this.cuestionarioEDACS[0].puntajeCuestionarioEDACS = puntajeTotalEDACS;

    if(puntajeTotalEDACS<=16){
      return puntajeTotalEDACS + ', por lo que existe riesgo bajo de que el dolor corresponda a un sindrome coronario agudo o IAM, evaluar otras causas como: dolor mecánico, TEP, etc.'
    }
    else{
      return puntajeTotalEDACS + ', por lo que no hay riesgo bajo de que sea un dolor asociado a sindrome coronario agudo  o IAM, por lo que sugiero hacer un EKG y enzimas cardiacas.'
    }
  }
}
