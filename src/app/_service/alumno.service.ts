import { HOST } from './../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { Alumno } from './../_model/alumno';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  url: string = HOST;


  /*debemos habilitarlo en el app.module.ts */
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Alumno[]>(`${this.url}/alumnos`)
  }

  listarPorId(alumno : Alumno){
    return this.http.get<Alumno>(`${this.url}/alumnos/${alumno.idAlumno}`)
  }

  registrar(alumno : Alumno){
    return this.http.post(`${this.url}/alumnos`,alumno)
  }

  modificar(alumno : Alumno){
    return this.http.put(`${this.url}/alumnos`,alumno)
  }

  eliminar(alumno : Alumno){
    return this.http.delete(`${this.url}/alumnos/${alumno.idAlumno}`)
  }

}
