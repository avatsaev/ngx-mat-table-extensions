import {DataSource} from '@angular/cdk/table';

import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of, Subject, Subscription} from 'rxjs';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import {EventEmitter} from '@angular/core';
import {DataSourceService, HttpDataSourceFilter} from '../models/data-source-service.model';



export class HttpDataSource<T> extends DataSource<T> {


  /**
   * Indicates whether the data is currently being remotely loaded or not, can be used for visual loading indicators
   */
  isLoading: boolean;

  /**
   * @ignore
   */
  private _isLoading$ = new Subject<boolean>();

  /**
   * Observable indicates whether the data is currently being remotely loaded or not, can be used with onPush change detection strategy
   */
  isLoading$ = this._isLoading$.asObservable();

  /**
   * Currently displayed data
   */
  data: T[];

  set sort(s: MatSort) {
    this._sort = s;
  }

  set paginator(p: MatPaginator) {
    this._paginator = p;
  }

  /**
   * @ignore
   */
  private _subs: Subscription[] = [];


  /**
   * @ignore
   */
  private _isFiltering = false;

  /**
   * @ignore
   */
  _filterChanges = new EventEmitter<HttpDataSourceFilter>();

  /**
   * @ignore
   */

  /**
   * @ignore
   */

  private _currentFilter: HttpDataSourceFilter;

  /**
   * @param dataService injectable service implementing the DataSourceSrvice<T> interface
   * @param _paginator Reference to MatTable's MatPaginator directive
   * @param [_sort=null] Reference to MatTable's MatSort directive
   */

  constructor(private dataService: DataSourceService<T>, private _paginator: MatPaginator, private _sort?: MatSort) {
    super();
  }

  /**
   * Filter table data remotely or locally
   * @param fieldName Field by which to filter
   * @param value Value of the filtered field
   * @param [remoteFilter = true] if true, will filter on the backend, false: will filter currently displayed data
   */
  filter({fieldName, value}: HttpDataSourceFilter) {

    console.log(fieldName, value);


    if (value && value.length > 0) {
      this._isFiltering = true;
    } else {
      this._isFiltering = false;
    }

    console.log('is filtering', this._isFiltering);

    if (this._isFiltering) {
      this._currentFilter = {
        value,
        fieldName
      };
    } else {
      this._currentFilter = undefined;
    }

    this._filterChanges.emit(this._currentFilter);

  }

  /**
   * @ignore
   */
  connect(): Observable<T[]> {

    const displayDataChanges: Array<EventEmitter<any>> = [
      this._paginator.page
    ];

    if (this._sort) {
      displayDataChanges.push(this._sort.sortChange);
      const sortChSub = this._sort.sortChange.subscribe(_ => this._paginator.pageIndex = 0);
      this._subs.push(sortChSub);
    }

    this._filterChanges.asObservable().subscribe(_ => this._paginator.pageIndex = 0);
    displayDataChanges.push(this._filterChanges);

    const isLoadingSub = this._isLoading$.asObservable().subscribe(isLoading => this.isLoading = isLoading);
    this._subs.push(isLoadingSub);

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap((sort: MatSort, _) => {

        console.log('[0]');
        this._isLoading$.next(true);
        return this.dataService.index(
          this._paginator.pageIndex * this._paginator.pageSize,
          this._paginator.pageSize,
          sort ? {field: this._sort.active, asc: this._sort.direction === 'asc' } : null,
          this._isFiltering ? this._currentFilter : null
        );

      }),
      tap((res) => this._paginator.length = res.total),
      map(results => results ? results.data : []),
      tap(data => this.data = data),
      tap(() => this._isLoading$.next(false)),
    );

  }

  /**
   * @ignore
   */
  disconnect() {
    this._subs.map(s => s.unsubscribe());
  }


}
