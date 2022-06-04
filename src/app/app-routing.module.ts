import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  //{ path: 'list', loadChildren: () => import('./blog-list/blog-list.module').then(m => m.BlogListModule), canLoad: [AuthGuard]}
  { path: '', loadChildren: () => import('./blog-list/blog-list.module').then(m => m.BlogListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
