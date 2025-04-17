import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post-model';
import { Comment } from '../models/comment-model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  //base de la url
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  //Traer todos los posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  // Filtrar por id del post
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  //Comentarios de un post
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
}