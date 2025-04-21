import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { PostDetailComponent } from './post-detail.component';

import { Post } from '../../models/post-model';
// Import your Comment model instead of Angular compiler's Comment
import { Comment } from '../../models/comment-model';
import { PostsService } from '../../services/posts.service';

describe('PostDetailComponent', () => {
  // Declaramos las variables que vamos a utilizar
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  //paranMap para el id del post
  //convertToParamMap para convertir el objeto en un observable
  const activatedRouteStub = {
    paramMap: of(convertToParamMap({
      id: '1'
    }))
  };

  //Mock de los posts
  const mockPost: Post = { id: 1, userId: 1, title: 'Test Post 1', body: 'Test Body 1' };
  // con 0 comentarios
  const mockComments: Comment[] = [];

  const postsServiceStub = {
    getPostById: jasmine.createSpy('getPostById').and.returnValue(of(mockPost)),
    getCommentsByPostId: jasmine.createSpy('getCommentsByPostId').and.returnValue(of(mockComments))
  };

  // Inicializamos el componente
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailComponent],
      providers: [
        { provide: PostsService, useValue: postsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Comprobamos que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Comprobamos que carga el post y los comentarios correctamente
  it('should load post and comments on init', () => {
    // El stub de service ya devuelve mockPost y mockComments
    expect(postsServiceStub.getPostById).toHaveBeenCalledWith(1);
    expect(postsServiceStub.getCommentsByPostId).toHaveBeenCalledWith(1);

    expect(component.post).toEqual(mockPost);
    expect(component.comments).toEqual(mockComments);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });
});
