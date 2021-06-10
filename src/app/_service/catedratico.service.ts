import { Subject } from 'rxjs';
import { Catedratico } from './../_model/catedratico';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CatedraticoService {

  catedraticoCambio = new Subject<Catedratico[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Catedratico[]>(`${this.url}/catedratico`)
  }

  listarPorId(catedratico: Catedratico){
    return this.http.get<Catedratico>(`${this.url}/catedratico/${catedratico.idCatedratico}`)
  }

  registrar(catedratico: Catedratico){
    return this.http.post(`${this.url}/catedratico`,catedratico)
  }

  modificar(catedratico: Catedratico){
    return this.http.post(`${this.url}/catedratico`,catedratico)
  }

  eliminar(idCatedratico: number){
    return this.http.delete(`${this.url}/catedratico/${idCatedratico}`)
  }

}
