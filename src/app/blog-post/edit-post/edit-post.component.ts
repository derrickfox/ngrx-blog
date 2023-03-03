import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BlogService } from 'src/app/blog.service';
import { UiService } from 'src/app/shared/ui.service';
import * as fromBlogging from '../../blog-list/blog-list.reducer';
import * as Blogging from '../../blog-list/blog-list.actions';
import { BlogPost } from '../blog-post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  public editPostForm!: FormGroup;
  public blogPost!: BlogPost;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private db: AngularFirestore, 
    private uiService: UiService,
    private store: Store<fromBlogging.State>) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      content: new FormControl('', { validators: [Validators.required] })
    });

    this.store.select(fromBlogging.editBlogPost).pipe(take(1)).subscribe((blogPost: BlogPost) => {
      this.blogPost = blogPost;

      this.editPostForm.patchValue({
        title: this.blogPost.title,
        content: this.blogPost.content
      });

      this.editPostForm.valueChanges.subscribe(() => {
        this.blogPost.title = this.editPostForm.value.title;
        this.blogPost.content = this.editPostForm.value.content;
      });
    });
  }

  private updateBlogPost(blogPost: BlogPost) {
    this.db.collection('blog-posts').doc(blogPost.id).update(blogPost);
  }

  public submitEditBlogPost(): void {      
    console.log(this.editPostForm.value);   
    const updatedBlogPost: BlogPost = {
      ...this.blogPost,
      title: this.editPostForm.value.title,
      content: this.editPostForm.value.content
    };
  
    this.updateBlogPost(updatedBlogPost);
  
    this.store.dispatch(new Blogging.UpdateBlogPost(updatedBlogPost));
  
    this.router.navigate(['/']);
  }
  
  public deletePost(id: string) {
    this.blogService.deleteBlogPost(id);
    
    this.router.navigate(['/']);
  }
}
