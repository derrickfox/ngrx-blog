import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BlogService } from 'src/app/blog.service';
import { UiService } from 'src/app/shared/ui.service';
import * as fromBlogging from '../../blog-list/blog-list.reducer';
import * as Blogging from '../../blog-list/blog-list.actions';
import { BlogPost, BlogPostImpl } from '../blog-post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  public editPostForm!: FormGroup;
  public blogPost!: BlogPostImpl;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private db: AngularFirestore, 
    private uiService: UiService,
    private dialog: MatDialog,
    private store: Store<fromBlogging.State>) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      content: new FormControl('', { validators: [Validators.required] }),
      labels: new FormControl('' )
    });

    this.store.select(fromBlogging.editBlogPost).pipe(take(1)).subscribe((blogPost: any) => {
      this.blogPost = blogPost;

      this.editPostForm.patchValue({
        title: this.blogPost.title,
        content: this.blogPost.content,
        labels: this.blogPost.labels
      });

      this.editPostForm.valueChanges.subscribe(() => {
        this.blogPost.setTitle(this.editPostForm.value.title);
        this.blogPost.setContent(this.editPostForm.value.content);
        this.blogPost.setLabels(this.editPostForm.value.labels);
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
      content: this.editPostForm.value.content,
      labels: this.editPostForm.value.labels
    };
  
    this.updateBlogPost(updatedBlogPost);
  
    this.store.dispatch(new Blogging.UpdateBlogPost(updatedBlogPost));
  
    this.router.navigate(['/']);
  }
  
  public deletePost(id: string) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this post?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the actual delete action when the user confirms.
        this.blogService.deleteBlogPost(id);
        
        this.router.navigate(['/']);
        console.log('User confirmed deletion');
      } else {
        console.log('User canceled deletion');
      }
    });

  }
}
