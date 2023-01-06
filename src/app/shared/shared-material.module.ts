import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MDialogComponent } from './components/mdialog/mdialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MyLineChartComponent } from '../my-line-chart/my-line-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule, // for MDialogComponent use ng- directive, because MDialogComponent in declarations
    FormsModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MyLineChartComponent,
    MatProgressSpinnerModule
  ],
  declarations: [
    MDialogComponent,
    MyLineChartComponent
  ]
})
export class SharedMaterialModule {

}
