import { Token } from './../_model/token';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenCambio = new Subject<Token[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST
  

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Token[]>(`${this.url}/token`)
  }

  listarPorId(idToken:number){
    return this.http.get<Token>(`${this.url}/token/${idToken}`)
  }

  registrar(token: Token){
    return this.http.post(`${this.url}/token`,token)
  }

  modificar(token: Token){
    return this.http.put(`${this.url}/token`,token)
  }

  eliminar(idToken: number){
    return this.http.delete(`${this.url}/token/${idToken}`)
  }

}
