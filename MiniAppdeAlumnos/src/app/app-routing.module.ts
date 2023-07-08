import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alumnos', component: AlumnosComponent },
  {path: 'asignaturas', component: AsignaturasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
