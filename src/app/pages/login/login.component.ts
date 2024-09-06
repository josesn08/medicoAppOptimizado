import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario:FormGroup;
  mensajeError:string = '';

  constructor( private builder:FormBuilder, private loginSvc:LoginService, private router:Router){
    this.formulario = builder.group({
      username:[''],
      password:['']
    });
  }

  public enviarDatos(){
    const credenciales  = this.formulario.value;
    console.log( credenciales );
    this.loginSvc.login(credenciales).subscribe({
      next: datos => this.procesarRespuesta(datos, credenciales),
      error: datos => this.mensajeError = datos
    })

  }

  public procesarRespuesta(datos:any, usuario:Usuario): void{
    this.router.navigateByUrl('/pacientes');
  }

  redirectToRegister() {
    this.router.navigate(['/registro-usuario']);
  }

}
