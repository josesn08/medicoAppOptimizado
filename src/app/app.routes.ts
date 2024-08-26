import { Routes } from '@angular/router';
import { HistoriaClinicaComponent } from './pages/historia-clinica/historia-clinica.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component'; // Asegúrate de importar tu componente de registro

export const routes: Routes = [
  { path: 'historiaClinica', component: HistoriaClinicaComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent } // Ruta para el registro de usuario
];
