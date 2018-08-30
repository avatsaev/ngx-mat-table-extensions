import {HttpDataSourceFilter} from 'ngx-mat-table-extensions';


export const dataFilter = <T>(data: Array<T>, filter: HttpDataSourceFilter) => {

  return data.filter((post: T) => {
    if (typeof post[filter.fieldName] === 'string') {
      return post[filter.fieldName].indexOf(filter.value) > 1;
    } else {
      return +post[filter.fieldName] === +filter.value;
    }
  });

};


export const compareBy = (fieldName: string, asc) => (a, b) => {

  if (a[fieldName] < b[fieldName]) {
    return asc ? -1 : 1;
  }

  if (a[fieldName] > b[fieldName]) {
    return  asc ? 1 : -1;
  }
  return 0;

};



