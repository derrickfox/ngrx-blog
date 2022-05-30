import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from './auth/auth.guard';
import { BlogListComponent } from './blog-list.component';


const routes: Routes = [
  { path: '', component: BlogListComponent }
  //{ path: 'list', loadChildren: () => import('./blog-list/blog-list.module').then(m => m.BlogListModule), canLoad: [AuthGuard]}
  //{ path: 'list', loadChildren: () => import('./blog-list/blog-list.module').then(m => m.BlogListModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  // ,
  // providers: [AuthGuard]
})
export class BlogListRoutingModule { }
