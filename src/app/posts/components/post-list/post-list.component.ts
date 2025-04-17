import { Component, OnInit } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Models
import { Post } from '../../models/post-model';

//Services
import { PostsService } from '../../services/posts.service';

//Shared
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoadingSpinnerComponent, ErrorMessageComponent]
})
export class PostListComponent implements OnInit {
  // Inicializacion de propiedades
  posts: Post[] = [];
  loading = false;
  error = false;
  errorMessage = 'Failed to load posts. Please try again later.';
  searchTerm = '';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = false;
    
    this.postsService.getPosts()
      .pipe(
        catchError(err => {
          this.error = true;
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  get filteredPosts(): Post[] {
    if (!this.searchTerm) {
      return this.posts;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.body.toLowerCase().includes(term)
    );
  }
}