import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Nota: Asegúrate de usar `styleUrls`, no `styleUrl`

})
export class AppComponent {
  title = 'medicoAppOptimizado';
  listadePaginas:(string)[]=[
    ''
  ]

  constructor (public loginSvc:LoginService ) { }

  public cerrarSesion():void{
    this.loginSvc.logout();
  }
}
