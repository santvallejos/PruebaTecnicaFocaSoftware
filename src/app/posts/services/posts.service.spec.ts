import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { environment } from '../../environment/environment';
import { Post } from '../models/post-model';
import { Comment } from '../models/comment-model';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts from the API', () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Test Post 1', body: 'Test Body 1' },
      { id: 2, userId: 1, title: 'Test Post 2', body: 'Test Body 2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should retrieve a post by id', () => {
    const mockPost: Post = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };

    service.getPostById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should retrieve comments for a post', () => {
    const mockComments: Comment[] = [
      { id: 1, postId: 1, name: 'Comment 1', email: 'test1@example.com', body: 'Comment Body 1' },
      { id: 2, postId: 1, name: 'Comment 2', email: 'test2@example.com', body: 'Comment Body 2' }
    ];

    service.getCommentsByPostId(1).subscribe(comments => {
      expect(comments.length).toBe(2);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});