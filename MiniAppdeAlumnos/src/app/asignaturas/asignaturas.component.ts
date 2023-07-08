import { Component, OnInit } from '@angular/core';
import { AsignaturasServicioService } from '../shared/asignaturas-servicio.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {
  studentId: string = '';
  teacherId: string = '';
  notaMedia: number = 0;
  asignaturasApuntadas: any[] = [];
  asignaturasImpartidas: any[] = [];
  nombre:string = '';
  apellido: string = '';
  asignaturas: string = '';
  
  constructor(private asignaturasServicio: AsignaturasServicioService) {}
  
  ngOnInit(): void {}

  obtenerNotaMedia(): void {
  this.asignaturasServicio.getNotaMedia(this.studentId).subscribe(
    (datos) => {
      this.nombre = datos.first_name;
      this.apellido = datos.last_name;
      this.notaMedia = datos.media;
    },
    (error) => {
      console.error('Error al obtener la nota media:', error);
    }
  );
}

  
  
  
  obtenerAsignaturasApuntadas(): void {
    if (this.studentId) {
      this.asignaturasServicio.getAsignaturasApuntadas(this.studentId).subscribe((data) => {
        console.log(data); // Verificar los datos recibidos
        if (data.alumno && data.asignaturas) {
          this.asignaturasApuntadas = [{
            asignatura: data.asignaturas[0],
            nombre: data.alumno.first_name,
            apellido: data.alumno.last_name
          }];
        } else if (data.data) {
          this.asignaturasApuntadas = data.data.map((item: any) => {
            return {
              asignatura: item.asignatura,
              nombre: '',
              apellido: ''
            };
          });
        } else {
          this.asignaturasApuntadas = [];
        }
      });
    } else {
      this.asignaturasServicio.getAlumnosAsignaturas().subscribe((data) => {
        console.log(data); // Verificar los datos recibidos
        this.asignaturasApuntadas = data.data.map((item: any) => {
          return {
            asignatura: item.asignatura,
            nombre: item.nombre,
            apellido: item.apellido
          };
        });
      });
    }
  }
  
  
  
  obtenerAsignaturasImpartidas(): void {
    if (this.teacherId) {
      this.asignaturasServicio.getAsignaturasImpartidas(this.teacherId).subscribe((data) => {
        console.log(data); // Verificar los datos recibidos
        if (data.data) {
          this.asignaturasImpartidas = data.data;
        } else {
          this.asignaturasImpartidas = [data];
        }
      });
    } else {
      this.asignaturasServicio.getProfesoresAsignaturas().subscribe((data) => {
        console.log(data); // Verificar los datos recibidos
        this.asignaturasImpartidas = data.data;
      });
    }
  }
  
}
