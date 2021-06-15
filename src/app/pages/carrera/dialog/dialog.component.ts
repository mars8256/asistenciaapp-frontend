import { Facultad } from './../../../_model/facultad';
//import { Facultad } from 'src/app/_model/facultad';
import { FacultadService } from './../../../_service/facultad.service';
import { CarreraService } from './../../../_service/carrera.service';
import { Carrera } from './../../../_model/carrera';
import { CarreraComponent } from './../carrera.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoComponent } from '../../token/dialogo/dialogo.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  carrera: Carrera
  facultad: Facultad

  facultades : Facultad[] = []
  idFacultadSeleccionado : number

  constructor(private dialogRef: MatDialogRef<DialogoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: Carrera,
              private carreraService: CarreraService,
              private facultadService: FacultadService) { }

  ngOnInit(): void {
    this.listarFacultades()
    this.carrera = new Carrera
    this.carrera.idCarrera = this.data.idCarrera
    this.carrera.facultad = this.data.facultad
    this.carrera.nombre = this.data.nombre
    if (this.data.facultad != null){
      this.idFacultadSeleccionado = this.data.facultad.idFacultad
    }
  
        
  }

  listarFacultades(){
    this.facultadService.listar().subscribe(data => {
      this.facultades = data
    })
  }

  cancelar(){
    this.dialogRef.close()
  }

  operar(){

    let fac = new Facultad()
    fac.idFacultad = this.idFacultadSeleccionado
    this.carrera.facultad = fac

    if(this.carrera != null && this.carrera.idCarrera > 0){
      this.carreraService.modificar(this.carrera).subscribe(data =>{
        this.carreraService.listar().subscribe(carreras => {
          this.carreraService.carreraCambio.next(carreras)
          this.carreraService.mensajeCambio.next('Registro modificado')
        })
      })
    } else {
      this.carreraService.registrar(this.carrera).subscribe(carrera => {
        this.carreraService.listar().subscribe(carreras =>{
          this.carreraService.carreraCambio.next(carreras)
          this.carreraService.mensajeCambio.next('Registro grabado')
        })
      })
    }
    this.dialogRef.close()
  }

 

}
