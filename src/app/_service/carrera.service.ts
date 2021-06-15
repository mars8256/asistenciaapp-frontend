import { Subject } from 'rxjs';
import { Carrera } from './../_model/carrera';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  carreraCambio = new Subject<Carrera[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;

  
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Carrera[]>(`${this.url}/carrera`)
  }

  listarPorId(carrera: Carrera){
    return this.http.get<Carrera>(`${this.url}/carrera/${carrera.idCarrera}`)
  }

  listarPorFacultadId(idFacultad: number){
    console.log(`${this.url}/carrera/facultad/${idFacultad}`)
    return this.http.get<Carrera[]>(`${this.url}/carrera/facultad/${idFacultad}`)
  }

  registrar(carrera: Carrera){
    console.log(carrera)
    return this.http.post(`${this.url}/carrera`, carrera)
  }

  modificar(carrera: Carrera){
    return this.http.post(`${this.url}/carrera`, carrera)
  }

  eliminar(idCarrera: number){
    return this.http.delete(`${this.url}/carrera/${idCarrera}`)
  }
  
}
