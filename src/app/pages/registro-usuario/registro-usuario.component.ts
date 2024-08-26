import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, usuarioRegistrado } from '../../model/usuario'; // Ajusta la ruta al archivo donde defines la interfaz Usuario
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  imports: [ReactiveFormsModule] // Importa ReactiveFormsModule para formularios reactivos
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombre: [''],
      apellidos: [''],
      numColegiado: [null, Validators.required],
      calle: [''],
      numDireccion: [''],
      especialidad: [''],
      lugNacimiento: [''],
      sexo: ['Hombre', Validators.required],
      fechaNac: [null, Validators.required],
      paisResidencia: [''],
      telefono: [null, Validators.required],
      sitioTrabajo: ['']
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const nuevoUsuario: Usuario = this.registroForm.value;
      usuarioRegistrado.push(nuevoUsuario);
      console.log('Usuario registrado:', nuevoUsuario);
      // Aquí puedes hacer otras acciones, como enviar los datos a un servidor
    }
  }
}
