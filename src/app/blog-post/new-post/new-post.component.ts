import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BlogService } from 'src/app/blog.service';
import { UiService } from 'src/app/shared/ui.service';
import * as fromBlogging from '../../blog-list/blog-list.reducer'
import * as Blogging from '../../blog-list/blog-list.actions';
import { BlogPost } from '../blog-post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {
  public newPostForm!: FormGroup;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private db: AngularFirestore, 
    private uiService: UiService,
    private store: Store<fromBlogging.State>) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      content: new FormControl('', { validators: [Validators.required] })
    });
  }

  private addDataToDatabase(blogPost: BlogPost) {
    this.db.collection('blog-posts').add(blogPost);
  }

  public submitNewBlogPost(): void {        
    console.log('submitNewBlogPost')
    this.store.select(fromBlogging.createNewBlogPost).pipe(take(1)).subscribe(() => {
      this.addDataToDatabase({
          id: '',
          title: this.newPostForm.value.title,
          date: new Date,
          content: this.newPostForm.value.content,
          author: 'test author',
          status: 'test status'
      });
      this.store.dispatch(new Blogging.CreateNewBlogPost(
        {
            id: '',
            title: 'Test Title from Dispatch',
            date: new Date,
            content: 'test dispatch content',
            author: 'test author',
            status: 'test status'
        }
      ));
      this.router.navigate(['/'])
    })
  }

}
