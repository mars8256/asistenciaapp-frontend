import { HOST } from './../_shared/var.constants';
import { Curso } from './../_model/curso';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoCambio = new Subject<Curso[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Curso[]>(`${this.url}/curso`)
  }

  listarPorId(idCurso:number){
    return this.http.get<Curso>(`${this.url}/curso/${idCurso}`)
  }

  registrar(curso : Curso){
    return this.http.post(`${this.url}/curso`,curso)
  }

  modificar(curso: Curso){
    return this.http.post(`${this.url}/curso`,curso)
  }

  eliminar(idCurso : number){
    return this.http.delete(`${this.url}/curso/${idCurso}`)
  }

}
