import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

const matModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule
];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MaterialModule {}
