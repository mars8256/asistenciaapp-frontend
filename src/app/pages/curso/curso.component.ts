import { CursoService } from './../../_service/curso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from 'src/app/_model/curso';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoCursoComponent } from './dialogo-curso/dialogo-curso.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  displayedColumns = ['idCurso','nombre','creditos','carrera','acciones']
  dataSource : MatTableDataSource<Curso>
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  


  constructor(private cursoService : CursoService, 
              private dialog : MatDialog,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.cursoService.listar().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })

    this.cursoService.cursoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })

    this.cursoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })
    })
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim()
    filterValue = filterValue.toLocaleLowerCase()
    this.dataSource.filter = filterValue
  }

  eliminar(idcurso: number){
    this.cursoService.eliminar(idcurso).subscribe(() =>{
      this.cursoService.listar().subscribe(data =>{
        this.cursoService.cursoCambio.next(data)
        this.cursoService.mensajeCambio.next('Registro eliminado')
      })
    })
  }

  openDialog(curso?: Curso){
    let cur = curso != null ? curso : new Curso()
    this.dialog.open(DialogoCursoComponent,{
      width: '450px',
      data: cur
    })
  }

}
