import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import './app.component.sass';

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
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EditPostComponent } from './blog-post/edit-post/edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LabelsListComponent } from './labels-list/labels-list.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    AdminDashComponent,
    BlogPostComponent,
    LeftSidePanelComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    HttpClientModule,
    BlogListModule,
    BlogPostModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    EditorModule,
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
    BlogService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
