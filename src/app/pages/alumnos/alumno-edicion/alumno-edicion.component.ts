import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alumno-edicion',
  templateUrl: './alumno-edicion.component.html',
  styleUrls: ['./alumno-edicion.component.css']
})
export class AlumnoEdicionComponent implements OnInit {

  form : FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
