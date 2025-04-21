import { Component, OnInit } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
  imports: [CommonModule, RouterLink, FormsModule, LoadingSpinnerComponent, ErrorMessageComponent, InfiniteScrollModule]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  displayedPosts: Post[] = [];   // Posts actualmente mostrados
  pageSize = 5;                 // Cantidad de posts por "scroll"
  currentPage = 0;              // Página actual
  loading = false;              // Indicador de carga inicial
  loadingMore = false;          // Indicador de carga de más posts
  allPostsLoaded = false;       // Indicador de que todos los posts han sido cargados
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
        this.displayNextPosts();
      });
  }

  displayNextPosts(): void {
    // Si ya se cargaron todos los posts
    if (this.allPostsLoaded || this.loadingMore) {
      return;
    }
    
    this.loadingMore = true; // Indicar que estamos cargando más posts
    
    // Loading
    setTimeout(() => {
      const start = this.currentPage * this.pageSize;   // Calcular el índice de inicio
      const end = start + this.pageSize;                // Calcular el índice de fin  
      
      // Verificar si hay más posts para cargar
      if (start >= this.posts.length) {
        this.allPostsLoaded = true;
        this.loadingMore = false;
        return;
      }
      
      // Obtener el siguiente lote de posts
      const nextPosts = this.posts.slice(start, end);
      
      // Añadir los nuevos posts a los ya mostrados
      this.displayedPosts = [...this.displayedPosts, ...nextPosts];
      
      // Incrementar la página actual
      this.currentPage++;
      
      // Verificar si ya se cargaron todos los posts
      if (this.displayedPosts.length >= this.posts.length) {
        this.allPostsLoaded = true;
      }
      
      this.loadingMore = false;
    }, 1000);
  }

  // Método para manejar el evento de scroll infinito
  onScroll(): void {
    this.displayNextPosts();
  }

  get filteredPosts(): Post[] {
    if (!this.searchTerm) {
      return this.displayedPosts;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.displayedPosts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.body.toLowerCase().includes(term)
    );
  }
  
  // Reiniciar la búsqueda
  onSearch(): void {
    // Si no hay término de búsqueda, restaurar la visualización normal con paginación
    if (!this.searchTerm) {
      this.displayedPosts = [];
      this.currentPage = 0;
      this.allPostsLoaded = false;
      this.displayNextPosts();
      return;
    }
    
    // Si hay término de búsqueda, buscar en TODOS los posts, no solo en los mostrados
    const term = this.searchTerm.toLowerCase();
    this.displayedPosts = this.posts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.body.toLowerCase().includes(term)
    );
    
    // Como ya mostramos todos los resultados de la búsqueda, marcamos como cargados
    this.allPostsLoaded = true;
  }
}