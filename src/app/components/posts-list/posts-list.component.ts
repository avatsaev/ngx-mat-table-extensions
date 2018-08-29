import {Component, OnInit, Input, OnChanges, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';

import {Post} from '../../models/post';
import {HttpDataSource} from '../../models/http.data-source';
import {PostsService} from '../../services/posts.service';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'title', 'body'];
  @Input() dataSource: HttpDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postsService: PostsService) {}


  ngOnInit() {
    this.dataSource = new HttpDataSource<Post>(this.postsService, this.paginator, this.sort);
  }

}
