import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post/blog-post.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {
  public blog_posts: BlogPost[] = [
		{title: 'Test 1', date: new Date(), content: 'Test Content 1', author: 'me', status: 'active'},
		{title: 'Test 2', date: new Date(), content: 'Test Content 2', author: 'me', status: 'active'},
		{title: 'Test 3', date: new Date(), content: 'Test Content 3', author: 'me', status: 'active'},
		{title: 'Test 4', date: new Date(), content: 'Test Content 4', author: 'me', status: 'active'}
	]

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getEveryBlogPost();
  }

}
