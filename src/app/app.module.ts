import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [ AppComponent, PostsListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [PostsService]
})
export class AppModule { }
