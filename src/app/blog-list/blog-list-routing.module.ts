import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPostComponent } from '../blog-post/edit-post/edit-post.component';
import { NewPostComponent } from '../blog-post/new-post/new-post.component';
//import { AuthGuard } from './auth/auth.guard';
import { BlogListComponent } from './blog-list.component';


const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'new', component: NewPostComponent },
  { path: 'edit-post/:id', component: EditPostComponent }
  //{ path: 'list', loadChildren: () => import('./blog-list/blog-list.module').then(m => m.BlogListModule), canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  // ,
  // providers: [AuthGuard]
})
export class BlogListRoutingModule { }
