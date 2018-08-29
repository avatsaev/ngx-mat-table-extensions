import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from '../models/post';
import {DataSourceService, SortOptions} from '../models/data-source-service.model';
@Injectable()
export class PostsService implements DataSourceService<Post> {

  constructor(private http: HttpClient) { }

  index(offset = 0, limit = 10, sort?: SortOptions) {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map(posts => ({
        total: posts.length,
        data: sort ?
          posts.splice(offset, limit).sort(compareBy(sort.field, sort.asc)) :
          posts.splice(offset, limit),
        offset,
        limit,
      }))
    );
  }

}




const compareBy = (fieldName: string, asc) => (a, b) => {

  if (a[fieldName] < b[fieldName]) {
    return asc ? -1 : 1;
  }

  if (a[fieldName] > b[fieldName]) {
    return  asc ? 1 : -1;
  }
  return 0;

};
