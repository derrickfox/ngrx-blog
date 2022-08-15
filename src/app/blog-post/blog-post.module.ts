import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { NewPostComponent } from "./new-post/new-post.component";

@NgModule({
    declarations: [
        NewPostComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [],
    entryComponents: []
})
export class BlogPostModule {}