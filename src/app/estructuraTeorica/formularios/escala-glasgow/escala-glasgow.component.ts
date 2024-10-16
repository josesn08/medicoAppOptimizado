import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-escala-glasgow',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './escala-glasgow.component.html',
  styleUrl: './escala-glasgow.component.css'
})
export class EscalaGlasgowComponent {
  glasgowForm: FormGroup;
  resultadoGlasgow: number | null = null;

  opcionesOcular = [
    { label: 'No abre los ojos', value: 1 },
    { label: 'Abre los ojos al dolor', value: 2 },
    { label: 'Abre los ojos al estímulo verbal', value: 3 },
    { label: 'Abre los ojos espontáneamente', value: 4 }
  ];

  opcionesVerbal = [
    { label: 'No hay respuesta verbal', value: 1 },
    { label: 'Sonidos incomprensibles', value: 2 },
    { label: 'Palabras inapropiadas', value: 3 },
    { label: 'Confuso, pero habla', value: 4 },
    { label: 'Orientado', value: 5 }
  ];

  opcionesMotora = [
    { label: 'No hay respuesta motora', value: 1 },
    { label: 'Extensión anormal', value: 2 },
    { label: 'Flexión anormal', value: 3 },
    { label: 'Retira al dolor', value: 4 },
    { label: 'Localiza el dolor', value: 5 },
    { label: 'Obedece órdenes', value: 6 }
  ];

  constructor(private fb: FormBuilder) {
    this.glasgowForm = this.fb.group({
      respuestaOcular: [null],
      respuestaVerbal: [null],
      respuestaMotora: [null]
    });
  }

  calcularGlasgow() {
    const ocular = this.glasgowForm.get('respuestaOcular')?.value || 0;
    const verbal = this.glasgowForm.get('respuestaVerbal')?.value || 0;
    const motora = this.glasgowForm.get('respuestaMotora')?.value || 0;

    this.resultadoGlasgow = ocular + verbal + motora;
  }
}
