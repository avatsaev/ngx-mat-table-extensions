import {Observable} from 'rxjs';

export interface IndexResponse<T> {
  message?: string;
  data: T[];
  total: number;
  offset: number;
  limit: number;
}

export interface SortOptions {
  field: string;
  asc: boolean;
}

export interface DataSourceService<T> {
  index: (offset: number, limit: number, sort?: SortOptions) => Observable<IndexResponse<T>>;
}
