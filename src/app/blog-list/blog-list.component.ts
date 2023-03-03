import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogPost } from '../blog-post/blog-post.model';
import { BlogService } from '../blog.service';
import * as fromBlogging from './blog-list.reducer';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {
  public isAuth$!: Observable<boolean>;
  public blog_posts: BlogPost[] = [];

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
    this.blogService.getEveryBlogPost();
  }

  public deleteBlogPost(id: string) {
    this.blogService.deleteBlogPost(id);
  }

  public editBlogPost(blogPost: BlogPost) {
    this.blogService.editBlogPost(blogPost);
  }

  public tweetBlogPost(id: string) {
    this.uiService.tweet(id);
  }

}
