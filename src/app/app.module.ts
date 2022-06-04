import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule, LayoutStyleBuilder, MediaMarshaller, StylesheetMap, StyleUtils } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'; 
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogListModule } from './blog-list/blog-list.module';
import { BlogService } from './blog.service';
import { BlogPostModule } from './blog-post/blog-post.module';
import { LeftSidePanelComponent } from './left-side-panel/left-side-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    AdminDashComponent,
    BlogPostComponent,
    LeftSidePanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    BlogListModule,
    BlogPostModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    StyleUtils,
    StylesheetMap,
    LayoutStyleBuilder,
    MediaMarshaller,
    AuthService,
    UiService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
