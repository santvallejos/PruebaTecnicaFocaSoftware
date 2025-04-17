import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsService } from './services/posts.service';
// { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    // Remove standalone components from declarations
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    // Add standalone components to imports instead
    PostListComponent,
    PostDetailComponent
  ],
  providers: [PostsService],
  exports: [
    // You can export imported components
    PostListComponent,
    PostDetailComponent
  ]
})
export class PostsModule { }
