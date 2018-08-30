import { NgModule } from '@angular/core';
import { MatTableFilterFormComponent } from './components/mat-table-filter/mat-table-filter-form.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  declarations: [MatTableFilterFormComponent],
  exports: [MatTableFilterFormComponent]
})
export class MatTableFilterFormModule { }
