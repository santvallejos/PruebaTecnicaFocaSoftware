import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, finalize, forkJoin, of } from 'rxjs';

//Services
import { PostsService } from '../../services/posts.service';

//Models
import { Post } from '../../models/post-model';
import { Comment } from '../../models/comment-model';

//shareds
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, ErrorMessageComponent]
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  loading = false;
  error = false;
  errorMessage = 'Failed to load post details. Please try again later.';

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadPostDetails(id);
      }
    });
  }

  loadPostDetails(id: number): void {
    this.loading = true;
    this.error = false;

    forkJoin({
      post: this.postsService.getPostById(id),
      comments: this.postsService.getCommentsByPostId(id)
    }).pipe(
      catchError(err => {
        this.error = true;
        return of({ post: null, comments: [] });
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(result => {
      this.post = result.post;
      this.comments = result.comments;
    });
  }
}