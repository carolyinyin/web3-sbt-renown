import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiTrainComponent } from './ui-train.component';

const routes: Routes = [{ path: '', component: UiTrainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiTrainRoutingModule { }
