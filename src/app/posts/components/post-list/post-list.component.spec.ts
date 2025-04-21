import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { PostListComponent } from './post-list.component';
import { PostsService } from '../../services/posts.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { Post } from '../../models/post-model';

describe('PostListComponent', () => {
  // Declaramos las variables que vamos a utilizar
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postsService: PostsService;

  // Mock de los posts
  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Test Post 1', body: 'Test Body 1' },
    { id: 2, userId: 2, title: 'Test Post 2', body: 'Test Body 2' }
  ];

  // Inicializamos el componente y el servicio
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Solucion al error, Si ocupamos componentes standalones
      // debemos implementarlos en el array de declarations
      imports: [
        PostListComponent,
        LoadingSpinnerComponent,
        ErrorMessageComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [PostsService]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
  });

  // Comprobamos que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Comprobamos que se cargan los posts al iniciar el componente
  it('should load posts on init', () => {
    // Mock del servicio
    spyOn(postsService, 'getPosts').and.returnValue(of(mockPosts));

    // Forzamos el componente a que se inicie
    fixture.detectChanges();

    // Comprobamos que se llamó al servicio y se asignaron los posts
    expect(postsService.getPosts).toHaveBeenCalled();
    // Comprobamos que se asignaron los posts
    expect(component.posts.length).toBe(2);
    // Comprobamos que no hay error
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  // Comprobamos que maneja el error cuando no se cargan los posts
  it('should handle error when loading posts fails', () => {
    spyOn(postsService, 'getPosts').and.returnValue(throwError(() => new Error('Error')));

    fixture.detectChanges();

    expect(postsService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(0);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeTrue();
  });

  // Comprobamos que filtra los posts correctamente
  it('should filter posts based on search term', () => {
    component.posts = mockPosts;
    component.searchTerm = 'Test Post 1';

    // Verificamos que se filtre un solo post con el término de búsqueda
    expect(component.filteredPosts.length).toBe(1);
    // y que sea el id 1
    expect(component.filteredPosts[0].id).toBe(1);

    // Verificamos que se filtre todos los posts cuando el término de búsqueda está vacío
    component.searchTerm = '';
    expect(component.filteredPosts.length).toBe(2);
  });
});
