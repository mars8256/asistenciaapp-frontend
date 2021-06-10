import { Facultad } from 'src/app/_model/facultad';
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
  facultades : Facultad[] = []
  idFacultadSeleccionado : Number

  constructor(private dialogRef: MatDialogRef<DialogoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: Carrera,
              private CarreraService: CarreraService,
              private facultadService: FacultadService) { }

  ngOnInit(): void {
    this.listarFacultades()

    this.carrera = new Carrera
    this.carrera.idCarrera = this.data.idCarrera
    this.carrera.facultad = this.data.facultad
    this.carrera.nombre = this.data.nombre
  
    

    
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

  }



}
