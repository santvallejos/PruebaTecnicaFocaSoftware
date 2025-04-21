import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { environment } from '../../environment/environment';
import { Post } from '../models/post-model';
import { Comment } from '../models/comment-model';

describe('PostsService', () => {
  //Declaracion de variables
  let service: PostsService; 
  let httpMock: HttpTestingController; 
  const apiUrl = environment.API_URL; 

  //Configuracion inicial
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [PostsService] 
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //Limpiar despues de cada prueba
  afterEach(() => {
    httpMock.verify();
  });

  //Prueba para ver si el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Prueba para ver si el servicio retorna los posts
  it('should retrieve posts from the API', () => {
    // Mocks
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Test Post 1', body: 'Test Body 1' },
      { id: 2, userId: 1, title: 'Test Post 2', body: 'Test Body 2' }
    ];

    service.getPosts().subscribe(posts => {
      // Verificamos que la respuesta tenga 2 posts
      expect(posts.length).toBe(2);
      // Verificamos que la respuesta sea igual a nuestros datos de prueba
      expect(posts).toEqual(mockPosts);
    });

    // Vereficacion de la peticion HTTP
    const req = httpMock.expectOne(`${apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    // Simulamos la respuesta del servidor con nuestro post de prueba
    req.flush(mockPosts);
  });

  // Prueba para verificar que se puede obtener un post por su ID
  it('should retrieve a post by id', () => {
    // Mock
    const mockPost: Post = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };

    service.getPostById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  // Prueba para verificar que se pueden obtener los comentarios de un post
  it('should retrieve comments for a post', () => {
    // Mocks
    const mockComments: Comment[] = [
      { id: 1, postId: 1, name: 'Comment 1', email: 'test1@example.com', body: 'Comment Body 1' },
      { id: 2, postId: 1, name: 'Comment 2', email: 'test2@example.com', body: 'Comment Body 2' }
    ];

    service.getCommentsByPostId(1).subscribe(comments => {
      // Verificamos que la respuesta tenga 2 comentarios
      expect(comments.length).toBe(2);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});