import { CarreraService } from './../../../_service/carrera.service';
import { CursoService } from './../../../_service/curso.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/_model/curso';
import { Carrera } from 'src/app/_model/carrera';

@Component({
  selector: 'app-dialogo-curso',
  templateUrl: './dialogo-curso.component.html',
  styleUrls: ['./dialogo-curso.component.css']
})
export class DialogoCursoComponent implements OnInit {

  curso : Curso
  carrera : Carrera
  carreras : Carrera[] = []
  idCarreraSeleccionado : number

  constructor(private dialogRef: MatDialogRef<DialogoCursoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Curso,
              private cursoService: CursoService,
              private carreraService: CarreraService) { }

  ngOnInit(): void {
    this.listarCarreras()
    this.curso = new Curso
    this.curso.idCurso = this.data.idCurso
    this.curso.nombre = this.data.nombre
    this.curso.creditos = this.data.creditos
    if(this.data.carrera != null){
      this.idCarreraSeleccionado = this.data.carrera.idCarrera
    }
  }

  cancelar(){
    this.dialogRef.close()
  }

  operar(){
    let car = new Carrera()
    car.idCarrera = this.idCarreraSeleccionado
    this.curso.carrera = car

    if(this.curso != null && this.curso.idCurso > 0){
      this.cursoService.modificar(this.curso).subscribe(data =>{
        this.cursoService.listar().subscribe(cursos =>{
          this.cursoService.cursoCambio.next(cursos)
          this.cursoService.mensajeCambio.next('Registro modificado')
        })
      })
    } else {
      this.cursoService.registrar(this.curso).subscribe(data =>{
        this.cursoService.listar().subscribe(cursos =>{
          this.cursoService.cursoCambio.next(cursos)
          this.cursoService.mensajeCambio.next('Registro grabado')
        })
      })
    }
    this.dialogRef.close()
  }

  listarCarreras(){
    this.carreraService.listar().subscribe(data =>{
      this.carreras = data
    })
  }
}
