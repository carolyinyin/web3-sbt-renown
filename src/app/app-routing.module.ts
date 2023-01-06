import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main', loadChildren: ()=> import('./train/train.module').then(m => m.TrainModule) },
  { path: 'ui-train', loadChildren: () => import('./ui-train/ui-train.module').then(m => m.UiTrainModule) },
  { path: 'my-material', loadChildren: () => import('./my-material/my-material.module').then(m => m.MyMaterialModule) },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'home',
      //   component: HomeComponent,
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
