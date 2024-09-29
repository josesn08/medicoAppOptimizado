import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl, FormsModule } from '@angular/forms';
import { MedicamentosComponent } from '../../medicamentos/medicamentos.component';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DisneaAgudaComponent } from './disnea-aguda/disnea-aguda.component';
import { DisneaCronicaComponent } from './disnea-cronica/disnea-cronica.component';

@Component({
  selector: 'app-disnea',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MedicamentosComponent, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, NgIf, DisneaAgudaComponent, DisneaCronicaComponent],
  templateUrl: './disnea.component.html',
  styleUrl: './disnea.component.css'
})
export class DisneaComponent{

  disneaForm : FormGroup;

  constructor (private fb: FormBuilder){
    this.disneaForm = this.fb.group({
      'tiempoDisnea' : [],

    });
  }





}
