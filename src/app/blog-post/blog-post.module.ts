import { NgModule } from "@angular/core";
import { EditorModule } from "@tinymce/tinymce-angular";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { LabelsListComponent } from "../labels-list/labels-list.component";

@NgModule({
    declarations: [
        NewPostComponent,
        EditPostComponent,
        LabelsListComponent
    ],
    imports: [
        SharedModule,
        EditorModule,
        AppRoutingModule
    ],
    exports: [],
    entryComponents: []
})
export class BlogPostModule {}