import { Routes } from '@angular/router';
import { PostListComponent } from './posts/components/post-list/post-list.component';  // Fix the path
import { PostDetailComponent } from './posts/components/post-detail/post-detail.component';  // Fix the path

export const routes: Routes = [
  //Redirecciona a posts si esta vacío
  { path: '', redirectTo: 'posts', pathMatch: 'full' },

  //Lista de posts
  { path: 'posts', component: PostListComponent },

  //Detalle de post
  { path: 'posts/:id', component: PostDetailComponent },

  //Si no existe la ruta redirecciona a posts
  { path: '**', redirectTo: 'posts' }
];
