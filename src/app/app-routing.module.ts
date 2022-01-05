import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { HomeComponent } from './home/home.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'empView',
    component : DisplayComponent
  },
  {
    path : 'newEmp',
    component : NewEmployeeComponent
  },
  {
    path : 'empEdit/:empID',
    component : NewEmployeeComponent
  },
  {
    path: 'error',
    component : ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
