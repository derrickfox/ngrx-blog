import { Component, OnInit } from '@angular/core';
import { BlogPost } from './blog-post.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.sass']
})
export class BlogPostComponent implements OnInit {

  private blog_post!: BlogPost;

  constructor() { }

  ngOnInit(): void {
  }

}
