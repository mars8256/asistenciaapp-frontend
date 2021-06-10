import { TokenService } from './../../../_service/token.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Token } from './../../../_model/token';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  token : Token

  constructor(private dialogRef: MatDialogRef<DialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Token,
              private TokenService : TokenService) { }


  ngOnInit(): void {
    this.token = new Token
    this.token.idToken = this.data.idToken
    this.token.token = this.data.token
  }


  cancelar(){
    this.dialogRef.close()
  }

  operar(){
    if(this.token != null && this.token.idToken > 0) {
      this.TokenService.modificar(this.token).subscribe(data => {
        this.TokenService.listar().subscribe(tokens => {
          this.TokenService.tokenCambio.next(tokens)
          this.TokenService.mensajeCambio.next('Registro modificado')
        })
      })
    } else {
      this.TokenService.registrar(this.token).subscribe(data => {
        this.TokenService.listar().subscribe(tokens => {
          this.TokenService.tokenCambio.next(tokens)
          this.TokenService.mensajeCambio.next('Registro grabado')
        })
      })
    }
    this.dialogRef.close()
  }
  
}
