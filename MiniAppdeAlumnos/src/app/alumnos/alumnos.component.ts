import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { AlumnosService } from '../shared/alumnos-servicio.service';
import { Alumno } from '../models/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnDestroy {

  alumnos: Alumno[] = [];

  alumno: Alumno = {
    student_id: 0,
    first_name: '',
    last_name: '',
    grupo_id: 0,
    ingreso: ''
  };
  limpiarCampos() {
    this.alumno = {
      student_id: 0,
      first_name: '',
      last_name: '',
      grupo_id: 0,
      ingreso: ''
    };
  }
  

  private subscription: Subscription | undefined;

  constructor(private alumnosService: AlumnosService) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  mostrarAlumnos() {
    if (this.alumno.student_id) {
      this.subscription = this.alumnosService.obtenerAlumnoPorId(this.alumno.student_id).pipe(
        tap({
          next: data => {
            this.alumnos = [data];
            this.alumnos[0].ingreso = data.ingreso; // Asigna el valor de ingreso al primer alumno en el array alumnos
          },
          error: error => {
            console.log('Error al obtener el alumno', error);
          }
        })
      ).subscribe();
    } else {
      this.subscription = this.alumnosService.obtenerAlumnos().pipe(
        tap({
          next: data => {
            this.alumnos = data;
            this.alumnos.forEach(alumno => alumno.ingreso = alumno.ingreso); // Asigna el valor de ingreso a cada alumno en el array alumnos
          },
          error: error => {
            console.log('Error al obtener los alumnos', error);
          }
        })
      ).subscribe();
    }
  }
  


  crearAlumno() {
    this.subscription = this.alumnosService.crearAlumno(this.alumno).pipe(
      tap({
        next: () => {
          console.log('Alumno creado correctamente');
          this.mostrarAlumnos();
          this.limpiarCampos();
        },
        error: error => {
          console.log('Error al crear el alumno', error);
        }
      })
    ).subscribe();
  }


 

  actualizarAlumno() {
    if (this.alumno) {
      this.subscription = this.alumnosService.actualizarAlumno(this.alumno)
        .pipe(
          tap(() => this.limpiarCampos()) // Agrega el operador tap para llamar a limpiarCampos
        )
        .subscribe({
          next: (alumno) => {
            console.log('Alumno actualizado correctamente');
            this.mostrarAlumnos();
          },
          error: (error) => {
            console.log('Error al actualizar el alumno', error);
          }
        });
    }
  }
  
  eliminarAlumno() {
    this.subscription = this.alumnosService.eliminarAlumno(this.alumno.student_id)
      .pipe(
        switchMap(() => this.alumnosService.obtenerAlumnos())
      )
      .subscribe({
        next: (alumnos) => {
          this.alumnos = alumnos;
          console.log('Alumno eliminado correctamente');
  
          // Llamar a la función para limpiar los campos del formulario
          this.limpiarCampos();
        },
        error: (error) => {
          console.log('Error al eliminar el alumno', error);
        }
      });
  }
  
  

}
