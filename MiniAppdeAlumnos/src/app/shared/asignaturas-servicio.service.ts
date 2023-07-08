import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsignaturasServicioService {
  private apiUrl = 'http://localhost:3000/asignaturas';

  constructor(private http: HttpClient) {}

  getNotaMedia(studentId: string): Observable<any> {
    const url = `${this.apiUrl}/media/${studentId}`;
    return this.http.get(url);
  }

  getAsignaturasApuntadas(studentId: string): Observable<any> {
    const url = studentId ? `${this.apiUrl}/apuntadas/${studentId}` : `${this.apiUrl}/apuntadas`;
    return this.http.get(url);
  }

  getAlumnosAsignaturas(): Observable<any> {
    const url = `${this.apiUrl}/apuntadas`;
    return this.http.get(url);
  }

  getAsignaturasImpartidas(teacherId: string): Observable<any> {
    const url = `${this.apiUrl}/impartidas/${teacherId}`;
    return this.http.get(url);
  }

  getProfesoresAsignaturas(): Observable<any> {
    const url = `${this.apiUrl}/impartidas`;
    return this.http.get(url);
  }
}
