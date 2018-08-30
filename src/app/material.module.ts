import {NgModule} from '@angular/core';

import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

const matModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MaterialModule {}
