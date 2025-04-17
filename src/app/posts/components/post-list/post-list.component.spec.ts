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
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postsService: PostsService;
  
  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Test Post 1', body: 'Test Body 1' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostListComponent,
        LoadingSpinnerComponent,
        ErrorMessageComponent
      ],
      imports: [
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    spyOn(postsService, 'getPosts').and.returnValue(of(mockPosts));
    
    fixture.detectChanges();
    
    expect(postsService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(2);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('should handle error when loading posts fails', () => {
    spyOn(postsService, 'getPosts').and.returnValue(throwError(() => new Error('Error')));
    
    fixture.detectChanges();
    
    expect(postsService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(0);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeTrue();
  });

  it('should filter posts based on search term', () => {
    component.posts = mockPosts;
    component.searchTerm = 'Test Post 1';
    
    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].id).toBe(1);
    
    component.searchTerm = '';
    expect(component.filteredPosts.length).toBe(2);
  });
});