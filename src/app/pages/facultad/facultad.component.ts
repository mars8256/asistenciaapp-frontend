import { Facultad } from './../../_model/facultad';
import { FacultadService } from './../../_service/facultad.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
//import { Facultad } from 'src/app/_model/facultad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoCatedraticoComponent } from '../catedratico/dialogo-catedratico/dialogo-catedratico.component';
import { DialogoFacultadComponent } from './dialogo-facultad/dialogo-facultad.component';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent implements OnInit {

  displayedColumns = ['idFacultad','nombre','acciones']
  dataSource : MatTableDataSource<Facultad>
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private facultadService:FacultadService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.facultadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =  this.sort;
      this.dataSource.paginator = this.paginator;
    })

    this.facultadService.facultadCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })

    this.facultadService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO',{
        duration:2000
      })
    })

  }

  applyFilter(filterValue: string){
   
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idFacultad: number){
    this.facultadService.eliminar(idFacultad).subscribe(() =>{
      this.facultadService.listar().subscribe(data => {
        this.facultadService.facultadCambio.next(data)
        this.facultadService.mensajeCambio.next('Registro eliminado')
      })
    })
  }

  openDialog(facultad?:Facultad){
    let fac = facultad != null ? facultad : new Facultad()
    this.dialog.open(DialogoFacultadComponent,{
      width: '350px',
      data: fac
    })
  }

}
