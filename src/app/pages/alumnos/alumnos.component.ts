import { DialogoAlumnoComponent } from './dialogo-alumno/dialogo-alumno.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from './../../_model/alumno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  displayedColumns = ['idAlumno','carnet','apellidos','nombres','correo','telefono','acciones']
  dataSource : MatTableDataSource<Alumno>
  alumnos : Alumno[] = [];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private alumnoService : AlumnoService, 
              private dialog : MatDialog, 
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.alumnoService.listar().subscribe(data=>{
      console.log(data);
    });
    this.listar()
  }

  listar(){
    this.alumnoService.listar().subscribe(data => {
      this.alumnos = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =  this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.alumnoService.alumnoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })

    this.alumnoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })
    })

  }

  applyFilter(filterValue: string){
   
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idAlumno: number){
    this.alumnoService.eliminar(idAlumno).subscribe(() =>{
      this.alumnoService.listar().subscribe(data =>{
        this.alumnoService.alumnoCambio.next(data)
        this.alumnoService.mensajeCambio.next('Registro eliminado')
      })
    })
  }

  openDialog(alumno?: Alumno){
    let alu = alumno != null ? alumno : new Alumno()
    this.dialog.open(DialogoAlumnoComponent,{
      width: '250px',
      data:alu
    })
  }

}
