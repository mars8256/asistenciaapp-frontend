import { CursoComponent } from './pages/curso/curso.component';
import { TokenComponent } from './pages/token/token.component';
import { AlumnoEdicionComponent } from './pages/alumnos/alumno-edicion/alumno-edicion.component';
import { CarreraComponent } from './pages/carrera/carrera.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CatedraticoComponent } from './pages/catedratico/catedratico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultadComponent } from './pages/facultad/facultad.component';


const routes: Routes = [
  { path: 'alumnos', component : AlumnosComponent},
  { path: 'catedratico', component : CatedraticoComponent},
  { path: 'facultad', component : FacultadComponent},
  { path: 'carrera', component : CarreraComponent},
  { path: 'token', component: TokenComponent},
  { path: 'curso', component: CursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
