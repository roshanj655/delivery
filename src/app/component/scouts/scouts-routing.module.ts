import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddScoutsComponent } from './add-scouts/add-scouts.component';


const routes: Routes = [
      {path: 'add', component: AddScoutsComponent},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoutsRoutingModule { }
