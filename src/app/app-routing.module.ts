import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdministratorComponent} from "./administrator/administrator.component";
import {StudentsComponent} from "./students/students.component";

const routes: Routes = [
  { path :"administrator", component : AdministratorComponent},
  { path :"students", component : StudentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
