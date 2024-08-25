import { Routes } from '@angular/router';
import { HistoriaClinicaComponent } from './pages/historia-clinica/historia-clinica.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';

export const routes: Routes = [
  { path: 'historiaClinica', component: HistoriaClinicaComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];
