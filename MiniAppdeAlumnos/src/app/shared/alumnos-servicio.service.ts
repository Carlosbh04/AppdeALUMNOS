import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  obtenerAlumnoPorId(studentId: number): Observable<Alumno> {
    const url = `${this.apiUrl}/search`;
    return this.http.post<Alumno>(url, { student_id: studentId });
  }

  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  actualizarAlumno(alumno: Alumno): Observable<Alumno> {
    const url = `${this.apiUrl}`;
    return this.http.put<Alumno>(url, alumno);
  }

  eliminarAlumno(studentId: number): Observable<void> {
    const url = `${this.apiUrl}`;
    return this.http.delete<void>(url, { body: { student_id: studentId } });
  }

 
}
