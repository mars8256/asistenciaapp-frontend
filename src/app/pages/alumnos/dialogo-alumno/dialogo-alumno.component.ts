import { Alumno } from './../../../_model/alumno';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnoService } from 'src/app/_service/alumno.service';

@Component({
  selector: 'app-dialogo-alumno',
  templateUrl: './dialogo-alumno.component.html',
  styleUrls: ['./dialogo-alumno.component.css']
})
export class DialogoAlumnoComponent implements OnInit {

  alumno: Alumno

  constructor(private dialogRef: MatDialogRef<DialogoAlumnoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Alumno,
              private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumno = new Alumno
    this.alumno.idAlumno = this.data.idAlumno
    this.alumno.nombres = this.data.nombres
    this.alumno.carnet = this.data.carnet
    this.alumno.apellidos = this.data.apellidos
    this.alumno.correo = this.data.correo
    this.alumno.telefono = this.data.telefono
  }

  cancelar(){
    this.dialogRef.close()
  }

  operar(){
    if(this.alumno != null && this.alumno.idAlumno > 0){
      this.alumnoService.modificar(this.alumno).subscribe(data =>{
        this.alumnoService.listar().subscribe(alumnos => {
          this.alumnoService.alumnoCambio.next(alumnos)
          this.alumnoService.mensajeCambio.next('Registro modificado')
        })
      })
    } else {
      this.alumnoService.registrar(this.alumno).subscribe(data =>{
        this.alumnoService.listar().subscribe(alumnos =>{
          this.alumnoService.alumnoCambio.next(alumnos)
          this.alumnoService.mensajeCambio.next('Registro grabado')
        })
      })
    }
    this.dialogRef.close()
  }

}
