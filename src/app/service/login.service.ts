import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Usuario } from '../model/usuario';
import { usuarioRegistrado } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  /**
   * Autentica al usuario con las credenciales proporcionadas.
   * @param credenciales - Las credenciales de inicio de sesión del usuario.
   * @returns Un Observable que emite el usuario autenticado o un error si las credenciales son incorrectas.
   */
  public login(credenciales: { username: string, password: string }): Observable<Usuario> {
    // Buscar el usuario con el nombre de usuario proporcionado
    const result = usuarioRegistrado.find(u => u.username === credenciales.username);

    // Verificar si el usuario existe y la contraseña es correcta
    if (result && result.password === credenciales.password) {
      // Guardar el nombre de usuario en localStorage
      localStorage.setItem('usuario-actual', credenciales.username);
      return of(result);
    }

    // Si las credenciales son incorrectas, lanzar un error
    return throwError(() => new Error('Credenciales Incorrectas'));
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  /**
   * Obtiene el nombre de usuario del usuario actualmente autenticado.
   * @returns El nombre de usuario o null si no hay un usuario autenticado.
   */
  public usuarioActual(): string | null {
    return localStorage.getItem('usuario-actual');
  }

  /**
   * Verifica si hay un usuario autenticado.
   * @returns true si hay un usuario autenticado, false en caso contrario.
   */
  public loggedIn(): boolean {
    return !!this.usuarioActual();
  }
}
