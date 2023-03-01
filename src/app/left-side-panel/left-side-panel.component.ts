import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post/blog-post.model';
import { BlogService } from '../blog.service';
import * as fromBlogging from '../blog-list/blog-list.reducer';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.sass']
})
export class LeftSidePanelComponent implements OnInit {
  public blog_posts: BlogPost[] = [];

  constructor(private blogService: BlogService, private store: Store<fromBlogging.State>, private uiService: UiService) { }

  ngOnInit(): void {
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

}
