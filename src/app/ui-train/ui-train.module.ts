import { SharedMaterialModule } from './../shared/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTrainRoutingModule } from './ui-train-routing.module';
import { UiTrainComponent } from './ui-train.component';


@NgModule({
  declarations: [
    UiTrainComponent
  ],
  imports: [
    CommonModule,
    UiTrainRoutingModule,
    SharedMaterialModule
  ]
})
export class UiTrainModule { }
