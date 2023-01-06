import { SharedMaterialModule } from './../shared/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMaterialRoutingModule } from './my-material-routing.module';
import { MyMaterialComponent } from './my-material.component';


@NgModule({
  declarations: [
    MyMaterialComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    MyMaterialRoutingModule
  ]
})
export class MyMaterialModule { }
