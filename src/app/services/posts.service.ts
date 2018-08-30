import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, throttleTime} from 'rxjs/operators';
import {Post} from '../models/post';

import {compareBy, dataFilter} from '../helpers';
import {
  DataSourceService,
  HttpDataSourceFilter,
  HttpDataSourceSort
} from 'ngx-mat-table-extensions';


@Injectable()
export class PostsService implements DataSourceService<Post> {

  constructor(private http: HttpClient) { }

  index(offset = 0, limit = 10, sort?: HttpDataSourceSort, filter?: HttpDataSourceFilter) {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map(posts => {

        // this part simulates the pagination, sorting, filtering on the backend

        let data = [...posts];

        if (sort) { // sort
          data = data.sort(compareBy(sort.field, sort.asc));
        }

        if (filter) { // filter
          data = dataFilter(data, filter);
        }

        const total = data.length;

        data = data.splice(offset, limit); // paginate

        return {
          total,
          data
        };

      })

    );

  }

}
