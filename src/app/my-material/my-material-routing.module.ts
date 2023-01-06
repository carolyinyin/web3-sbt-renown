import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMaterialComponent } from './my-material.component';

const routes: Routes = [{ path: '', component: MyMaterialComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMaterialRoutingModule { }
