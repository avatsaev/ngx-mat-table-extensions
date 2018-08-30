import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {HttpDataSourceFilter} from '../../models/data-source-service.model';
import {HttpDataSource} from '../../data-sources/http.data-source';



@Component({
  selector: 'mat-table-filter-form',
  templateUrl: './mat-table-filter-form.component.html',
  styleUrls: ['./mat-table-filter-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatTableFilterFormComponent implements OnInit, OnChanges {


  @Input() filterFields = [];
  @Input() httpDataSource: HttpDataSource<any>;

  filterValueFormControl = new FormControl('');
  filterFieldNameFromControl = new FormControl('');

  @Output() valueChange = this.filterValueFormControl.valueChanges;
  @Output() fieldNameChange = this.filterFieldNameFromControl.valueChanges;
  @Output() filterChange: Observable<HttpDataSourceFilter> = combineLatest(
    this.filterValueFormControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),
    this.filterFieldNameFromControl.valueChanges
  ).pipe(
    map(([value, fieldName]) => ({value, fieldName}))
  );

  constructor() { }

  ngOnInit() {
    this.filterChange.subscribe(filter => this.httpDataSource.filter(filter));
  }

  ngOnChanges() {
    if (this.filterFields && this.filterFields.length) {
      setTimeout(() =>  this.filterFieldNameFromControl.setValue(this.filterFields[0]));
    } else {
      console.warn('mat-table-filter-form requires field names to filter by');
    }
  }

}
