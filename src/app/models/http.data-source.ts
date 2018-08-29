import {DataSource} from '@angular/cdk/table';
import {DataSourceService} from './data-source-service.model';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, Subscription} from 'rxjs';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import {EventEmitter} from '@angular/core';

export class HttpDataSource<T> extends DataSource<T> {

  resultsLength = 0;
  isLoading: boolean;

  set sort(s: MatSort) {
    this._sort = s;
  }

  set paginator(p: MatPaginator) {
    this._paginator = p;
  }

  private _subs: Subscription[] = [];

  constructor(private dataService: DataSourceService<T>, private _paginator: MatPaginator, private _sort?: MatSort) {
    super();
  }

  connect(): Observable<T[]> {

    const displayDataChanges: Array<EventEmitter<any>> = [
      this._paginator.page
    ];

    if (this._sort) {
      displayDataChanges.push(this._sort.sortChange);
      const sortChSub = this._sort.sortChange.subscribe(_ => this._paginator.pageIndex = 0);
      this._subs.push(sortChSub);
    }

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap((sort, pageIndex) => {
        this.isLoading = true;
        return this.dataService.index(
          this._paginator.pageIndex * this._paginator.pageSize,
          this._paginator.pageSize,
          sort ? {field: sort.active, asc: sort.direction === 'asc' } : null
        );
      }),
      tap(() => this.isLoading = false),
      tap((res) => this._paginator.length = res.total),
      map(results => results ? results.data : [])
    );

  }


  disconnect() {
    this._subs.map(s => s.unsubscribe());
  }


}
