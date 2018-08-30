import {Observable} from 'rxjs';

export interface IndexResponse<T> {
  message?: string;
  data: T[];
  total: number;
  offset?: number;
  limit?: number;
}

export interface HttpDataSourceFilter {
  fieldName: string;
  value: ArrayLike<any>;
}

export interface HttpDataSourceSort {
  field: string;
  asc: boolean;
}

export interface DataSourceService<T> {
  index: (
    offset: number,
    limit: number,
    sort?: HttpDataSourceSort,
    filter?: HttpDataSourceFilter
  ) => Observable<IndexResponse<T>>;
}
