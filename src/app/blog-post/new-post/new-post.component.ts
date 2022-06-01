import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BlogService } from 'src/app/blog.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {
  newPostForm!: FormGroup;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      content: new FormControl('', { validators: [Validators.required] })
    });
  }
  public submitNewBlogPost(): void {
  }
}
