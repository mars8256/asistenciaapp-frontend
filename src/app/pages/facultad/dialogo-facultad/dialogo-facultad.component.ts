import { FacultadService } from './../../../_service/facultad.service';
import { Facultad } from './../../../_model/facultad';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-facultad',
  templateUrl: './dialogo-facultad.component.html',
  styleUrls: ['./dialogo-facultad.component.css']
})
export class DialogoFacultadComponent implements OnInit {

  facultad : Facultad

  constructor(private dialogRef: MatDialogRef<DialogoFacultadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Facultad,
              private facultadService: FacultadService) { }

  ngOnInit(): void {
    this.facultad = new Facultad
    this.facultad.idFacultad = this.data.idFacultad
    this.facultad.nombre = this.data.nombre
  }

  cancelar(){
    this.dialogRef.close()
  }

  operar(){
    if(this.facultad != null && this.facultad.idFacultad > 0){
      this.facultadService.modificar(this.facultad).subscribe(data =>{
        this.facultadService.listar().subscribe(facultades =>{
          this.facultadService.facultadCambio.next(facultades)
          this.facultadService.mensajeCambio.next('Registro modificado')
        })
      })
    } else {
      this.facultadService.registrar(this.facultad).subscribe(data => {
        this.facultadService.listar().subscribe(facultades => {
          this.facultadService.facultadCambio.next(facultades)
          this.facultadService.mensajeCambio.next('Registro modificado')
        })
      })
    }
    this.dialogRef.close()
  }

}
