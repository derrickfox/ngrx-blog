import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { BlogListRoutingModule } from "./blog-list-routing.module";
import { BlogListComponent } from "./blog-list.component";
import { blogListReducer } from "./blog-list.reducer";

@NgModule({
    declarations: [
        BlogListComponent
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('blog_post_state', blogListReducer),
        BlogListRoutingModule
    ],
    exports: [],
    entryComponents: [BlogListComponent]
})
export class BlogListModule {}