import { FacultadService } from './../../_service/facultad.service';
import { Facultad } from './../../_model/facultad';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraService } from './../../_service/carrera.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Carrera } from 'src/app/_model/carrera';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';



@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {


  displayedColumns = ['idCarrera','facultad','nombre','acciones']
  dataSource: MatTableDataSource<Carrera>
  
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  facultades : Facultad[] = []
  idFacultadSeleccionado : number

  constructor(private carreraService: CarreraService, 
              private dialog : MatDialog,
              private snackBar: MatSnackBar, 
              private facultadService: FacultadService) { }

  ngOnInit() {
    this.listarFacultades()
    this.carreraService.listar().subscribe(data=>{
     console.log(data);
    });
    
    this.listar()
  }


  listar(){
    this.carreraService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })

    this.carreraService.carreraCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })

    this.carreraService.mensajeCambio.subscribe(data => {
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

  eliminar(idCarrera: number){
    this.carreraService.eliminar(idCarrera).subscribe(() => {
      this.carreraService.listar().subscribe(data => {
        this.carreraService.carreraCambio.next(data)
        this.carreraService.mensajeCambio.next('Registro eliminado')
      })
    })
  }

  openDialog(carrera?:Carrera){
    let car = carrera != null ? carrera : new Carrera()
    this.dialog.open(DialogComponent, {
      width: '550px',
      data: car
    })
  }

  listarFacultades(){
    this.facultadService.listar().subscribe(data => {
      this.facultades = data
    })
  }

  find(){
    console.log('mensaje')
    if (this.idFacultadSeleccionado != null){
      console.log(this.idFacultadSeleccionado)
      this.carreraService.listarPorFacultadId(this.idFacultadSeleccionado).subscribe(datos =>{
        this.dataSource = new MatTableDataSource(datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      })
    }
  }

}
