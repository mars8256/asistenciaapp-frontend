import { CatedraticoService } from './../../../_service/catedratico.service';
import { Catedratico } from './../../../_model/catedratico';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-catedratico',
  templateUrl: './dialogo-catedratico.component.html',
  styleUrls: ['./dialogo-catedratico.component.css']
})
export class DialogoCatedraticoComponent implements OnInit {

  catedratico: Catedratico

  constructor(private dialogRef: MatDialogRef<DialogoCatedraticoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Catedratico,
              private catedraticoService: CatedraticoService) { }

  ngOnInit(): void {
    this.catedratico = new Catedratico()
    this.catedratico.idCatedratico = this.data.idCatedratico
    this.catedratico.nombres = this.data.nombres
    this.catedratico.apellidos = this.data.apellidos
    this.catedratico.correo = this.data.correo
  }

  cancelar(){
    this.dialogRef.close()
  }

  operar(){
    if(this.catedratico != null && this.catedratico.idCatedratico > 0){
      this.catedraticoService.modificar(this.catedratico).subscribe(data =>{
        this.catedraticoService.listar().subscribe(catedraticos =>{
          this.catedraticoService.catedraticoCambio.next(catedraticos)
          this.catedraticoService.mensajeCambio.next('Registro modificado')
        })
      })
    } else {
      this.catedraticoService.registrar(this.catedratico).subscribe(data =>{
        this.catedraticoService.listar().subscribe(catedraticos => {
          this.catedraticoService.catedraticoCambio.next(catedraticos)
          this.catedraticoService.mensajeCambio.next('Registro grabado')
        })
      })
    }
    this.dialogRef.close()
  }

}
