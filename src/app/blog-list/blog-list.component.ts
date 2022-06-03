import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogPost } from '../blog-post/blog-post.model';
import { BlogService } from '../blog.service';
import * as fromBlogging from './blog-list.reducer'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {
  public blog_posts: BlogPost[] = [];

  constructor(private blogService: BlogService, private store: Store<fromBlogging.State>) { }

  ngOnInit(): void {
    this.store.select(fromBlogging.getAllBlogPosts).subscribe((blog_posts: BlogPost[]) => {
      this.blog_posts = blog_posts;
      console.log('component -> select -> this.blog_posts', this.blog_posts);
    });
    this.blogService.getEveryBlogPost();
  }

  public deleteBlogPost(id: string) {
    console.log('component -> deleteBlogPost(id)', id);
    this.blogService.deleteBlogPost(id);
  }
}
