import { Token } from './../../_model/token';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TokenService } from './../../_service/token.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  displayedColumns = ['idToken','token','acciones']
  dataSource : MatTableDataSource<Token>

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator



  constructor(private tokenService: TokenService,
              private dialog : MatDialog,
              private snakBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tokenService.listar().subscribe(data =>{
      console.log(data)
    })

    this.listar()

  }

  listar(){
    this.tokenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(filterValue:string){
    filterValue = filterValue.trim()
    filterValue = filterValue.toLocaleLowerCase()
    this.dataSource.filter = filterValue
  }

  eliminar(idToken: number){
    this.tokenService.eliminar(idToken).subscribe(() =>{
      this.tokenService.listar().subscribe(data => {
        this.tokenService.tokenCambio.next(data)
        this.tokenService.mensajeCambio.next('Registro eliminado')
      })
    })
  }

  openDialog(token?: Token){
    let tok = token != null ? token : new Token()
    this.dialog.open(DialogoComponent, {
      width: '250px',
      data: tok
    })
  }

}
