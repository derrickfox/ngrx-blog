import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post/blog-post.model';
import { BlogService } from '../blog.service';
import * as fromBlogging from '../blog-list/blog-list.reducer';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { UiService } from '../shared/ui.service';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.sass']
})
export class LeftSidePanelComponent implements OnInit {
  public blog_posts: BlogPost[] = [];
  public searchText: string = '';
  public sortedAsc: BlogPost[] = [];
  public searchTerm: string = '';
  public searchResults$!: Observable<BlogPost[]>;
  public isAuth$!: Observable<boolean>;

  constructor(private blogService: BlogService, private store: Store<fromBlogging.State>, private uiService: UiService) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.store.select(fromRoot.getIsAuth).subscribe(auth => {
    })
    this.store.select(fromBlogging.getAllBlogPosts).subscribe((blog_posts: BlogPost[]) => {
      if (blog_posts) {
        const sortedAsc = [...blog_posts];
        sortedAsc.sort(
          (objA, objB) => Number(objB.date) - Number(objA.date),
        );        
        this.blog_posts = sortedAsc;
      }
    });
  }

  public editBlogPost(blogPost: BlogPost) {
    this.blogService.editBlogPost(blogPost);
  }

  // public onSearchChange() {
  //   if (this.searchText) {
  //     console.log('left-side-panel -> onSearchChange -> searchText: ', this.searchText);
  //     //this.blogService.searchBlogs(this.searchText);
  //     this.store.dispatch(searchBlogPosts({ searchTerm: this.searchText }));
  //     // this.store.select(fromBlogging.searchBlogPost).subscribe((blogs_found: BlogPost[]) => {
  //     //   console.log('left-side-panel -> onSearchChange -> this.store.select searchBlogPost -> blogs_found', blogs_found);
  //     // });
  //   } else {
  //     this.store.dispatch(new ClearSearch());
  //   }
  // }

  // public searchBlogs() {
  //   this.store.dispatch(searchBlogPosts({ searchTerm: this.searchText }));
  // }

  // public clearSearch() {
  //   this.store.dispatch(new ClearSearch());
  //   this.searchText = '';
  // }
  
  
}
