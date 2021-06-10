import { Subject } from 'rxjs';
import { HOST } from './../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { Alumno } from './../_model/alumno';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumnoCambio = new Subject<Alumno[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;


  /*debemos habilitarlo en el app.module.ts */
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Alumno[]>(`${this.url}/alumnos`)
  }

  listarPorId(idAlumno : number){
    return this.http.get<Alumno>(`${this.url}/alumnos/${idAlumno}`)
  }

  registrar(alumno : Alumno){
    return this.http.post(`${this.url}/alumnos`,alumno)
  }

  modificar(alumno : Alumno){
    return this.http.put(`${this.url}/alumnos`,alumno)
  }

  eliminar(idAlumno : number){
    return this.http.delete(`${this.url}/alumnos/${idAlumno}`)
  }

}
