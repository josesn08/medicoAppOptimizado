import { Paciente } from './../../../model/paciente';
import { Component, signal, Input, Signal, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { FormularioEDACSComponent } from "../../formularios/formulario-edacs/formulario-edacs.component";
import { HistoriaClinicaComponent } from 'src/app/pages/historia-clinica/historia-clinica.component';
import { DatosCompartidosHistoriaClinicaService } from 'src/app/service/datos-compartidos-historia-clinica.service';



@Component({
  selector: 'app-filiacion-yantecedentes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormularioEDACSComponent],
  templateUrl: './filiacion-yantecedentes.component.html',
  styleUrls: ['./filiacion-yantecedentes.component.css']
})
export class FiliacionYAntecedentesComponent {

  paciente:Paciente[];
  filiacionPacienteForm:FormGroup;
  @Output() asignarEdad = new EventEmitter<number>();
  @Output() sexoChange = new EventEmitter<string>();
  edad:number=0;
  edadNum: number=0;


  constructor (private fb: FormBuilder, private datosCompartidosHistoriaClinicaService: DatosCompartidosHistoriaClinicaService) {
    this.filiacionPacienteForm = this.fb.group({
      'edad' : [''],
      'sexo': [''],
      'raza': [''],
      'profesion': [''],
      'orientacionSexual': [''],
      'promiscuidad': [''],
    });



    this.paciente = [{
      numeroHistoriaClinica:0,
      email:'',
      nombre:'',
      apellidos:'',
      calle:'',
      numDireccion:'',
      lugNacimiento:'',
      sexo:'',
      fechaNac:new Date,
      edad:0,
      paisResidencia:'',
      telefono:0,
      profesion:'',
      raza:[],
    }]

    this.paciente[0].raza = ['Mediterraneo (Español)', 'Eslavo', 'Caucásico', 'Árabe', 'Asiático', 'Americano'];



  }

  obtenerEdadDelFormulario() {
    this.datosCompartidosHistoriaClinicaService.setEdad(this.filiacionPacienteForm.get('edad')?.value)
  }

  obtenerSexoDelFormulario(){
    this.datosCompartidosHistoriaClinicaService.setSexo(this.filiacionPacienteForm.get('sexo')?.value)
  }
}







