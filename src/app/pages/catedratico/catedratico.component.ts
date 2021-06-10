import { Catedratico } from './../../_model/catedratico';
import { MatTableDataSource } from '@angular/material/table';
import { CatedraticoService } from './../../_service/catedratico.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoCatedraticoComponent } from './dialogo-catedratico/dialogo-catedratico.component';

@Component({
  selector: 'app-catedratico',
  templateUrl: './catedratico.component.html',
  styleUrls: ['./catedratico.component.css']
})
export class CatedraticoComponent implements OnInit {

  displayedColumns = ['idCatedratico','apellidos','nombres','correo','acciones']
  dataSource : MatTableDataSource<Catedratico>
  catedraticos : Catedratico[] = [];
  @ViewChild (MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator


  constructor(private catedraticoService: CatedraticoService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.catedraticoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    this.catedraticoService.catedraticoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })

    this.catedraticoService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })

  }

  applyFilter(filterValue: string){
   
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idCatedratico: number){
    this.catedraticoService.eliminar(idCatedratico).subscribe(() =>{
      this.catedraticoService.listar().subscribe(data =>{
        this.catedraticoService.catedraticoCambio.next(data)
        this.catedraticoService.mensajeCambio.next('Registro eliminado')
      })
    })
  }

  openDialog(catedratico?:Catedratico){
    let cat = catedratico != null ? catedratico : new Catedratico()
    this.dialog.open(DialogoCatedraticoComponent, {
      width: '350px',
      data: cat
    })
  }

}
