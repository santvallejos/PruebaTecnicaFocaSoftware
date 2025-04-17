import { Routes } from '@angular/router';
import { PostListComponent } from './posts/components/post-list/post-list.component';  // Fix the path
import { PostDetailComponent } from './posts/components/post-detail/post-detail.component';  // Fix the path

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '**', redirectTo: 'posts' }
];
