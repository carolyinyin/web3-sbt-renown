import { SharedMaterialModule } from './../shared/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainRoutingModule } from './train-routing.module';
import { TrainComponent } from './train.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    TrainComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    TrainRoutingModule,
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ]
})
export class TrainModule { }
