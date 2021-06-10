import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CatedraticoComponent } from './pages/catedratico/catedratico.component';
import { FacultadComponent } from './pages/facultad/facultad.component';
import { CarreraComponent } from './pages/carrera/carrera.component';
import { AlumnoEdicionComponent } from './pages/alumnos/alumno-edicion/alumno-edicion.component';
import { TokenComponent } from './pages/token/token.component';
import { DialogoComponent } from './pages/token/dialogo/dialogo.component';
import { CursoComponent } from './pages/curso/curso.component';
import { DialogComponent } from './pages/carrera/dialog/dialog.component';
import { DialogoCatedraticoComponent } from './pages/catedratico/dialogo-catedratico/dialogo-catedratico.component';
import { DialogoFacultadComponent } from './pages/facultad/dialogo-facultad/dialogo-facultad.component';
import { DialogoAlumnoComponent } from './pages/alumnos/dialogo-alumno/dialogo-alumno.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CatedraticoComponent,
    FacultadComponent,
    CarreraComponent,
    AlumnoEdicionComponent,
    TokenComponent,
    DialogoComponent,
    CursoComponent,
    DialogComponent,
    DialogoCatedraticoComponent,
    DialogoFacultadComponent,
    DialogoAlumnoComponent
  ],  
  entryComponents : [DialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
