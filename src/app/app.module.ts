import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import {VeilComponent} from './components/veil/veil.component';
import {MaterialModule} from './material.module';
import {MatTableFilterFormModule} from 'ngx-mat-table-extensions';





@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatTableFilterFormModule
  ],
  declarations: [
    AppComponent,
    PostsListComponent,
    VeilComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [PostsService]
})
export class AppModule { }
