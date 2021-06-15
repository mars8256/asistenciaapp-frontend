import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HOST } from './../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';
import { Alumno } from './../_model/alumno';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumnoCambio = new Subject<Alumno[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;
  //headers = new HttpHeaders()
  



  /*debemos habilitarlo en el app.module.ts */
  constructor(private http:HttpClient) {
   
  }



  listar(){
    return this.http.get<Alumno[]>(`${this.url}/alumnos`)
  }

  listarPorId(idAlumno : number){
    return this.http.get<Alumno>(`${this.url}/alumnos/${idAlumno}`)
  }

  registrar(alumno : Alumno)  {
        return this.http.post(`${this.url}/alumnos`,alumno,{observe:'response'})

    }
      
      
 

  modificar(alumno : Alumno){
  
    return this.http.put(`${this.url}/alumnos`,alumno)
  }

  eliminar(idAlumno : number){
    console.log(`${this.url}/alumnos/${idAlumno}`)
    return this.http.delete(`${this.url}/alumnos/${idAlumno}`)
  }

}
