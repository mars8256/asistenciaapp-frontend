import { Alumno } from './../../_model/alumno';
import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/_service/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos : Alumno[] = [];

  constructor(private alumnoService : AlumnoService) { }

  ngOnInit() {
    this.alumnoService.listar().subscribe(data=>{
      console.log(data);
    });
  }

  listar(){
    this.alumnoService.listar().subscribe(data => {
      this.alumnos = data;
    });
  }


}
