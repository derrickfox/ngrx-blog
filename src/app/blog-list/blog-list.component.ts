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
  public blog_posts_test: BlogPost[] = [
		{title: 'Test 1', date: new Date(), content: 'Test Content 1', author: 'me', status: 'active'},
		{title: 'Test 2', date: new Date(), content: 'Test Content 2', author: 'me', status: 'active'},
		{title: 'Test 3', date: new Date(), content: 'Test Content 3', author: 'me', status: 'active'},
		{title: 'Test 4', date: new Date(), content: 'Test Content 4', author: 'me', status: 'active'}
	]

  constructor(private blogService: BlogService, private store: Store<fromBlogging.State>) { }

  ngOnInit(): void {
    this.store.select(fromBlogging.getAllBlogPosts).subscribe((blog_posts: BlogPost[]) => {
      this.blog_posts = blog_posts;
      console.log('this.blog_posts', this.blog_posts);
    });
    this.blogService.getEveryBlogPost1();
  }

}
