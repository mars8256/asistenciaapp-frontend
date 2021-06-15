import { Subject } from 'rxjs';
import { Facultad } from './../_model/facultad';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  facultadCambio = new Subject<Facultad[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Facultad[]>(`${this.url}/facultad`)
  }

  listarPorId(idFacultad: number){
    return this.http.get<Facultad>(`${this.url}/facultad/${idFacultad}`)
  }

  registrar(facultad: Facultad){
    return this.http.post(`${this.url}/facultad`,facultad)
  }

  modificar(facultad: Facultad){
    return this.http.post(`${this.url}/facultad`,facultad)
  }

  eliminar(idFacultad: number){
    return this.http.delete(`${this.url}/facultad/${idFacultad}`)
  }

}
