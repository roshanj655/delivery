import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoutsRoutingModule } from './scouts-routing.module';
import { AddScoutsComponent } from './add-scouts/add-scouts.component';


@NgModule({
  declarations: [AddScoutsComponent],
  imports: [
    CommonModule,
    ScoutsRoutingModule,
    FormsModule,
        ReactiveFormsModule
  ]
})
export class ScoutsModule { }
