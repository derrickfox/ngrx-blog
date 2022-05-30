import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { UiService } from "./shared/ui.service";
import { BlogPost } from "./blog-post/blog-post.model";
import * as UI from './shared/ui.actions';
import * as Blogging from './blog-list/blog-list.actions';
import * as fromBlogging from './blog-list/blog-list.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class BlogService {
    public allBlogPosts = new Subject<BlogPost>();
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore, 
        //private uiService: UiService,
        private store: Store<fromBlogging.State>
    ) {}
    
    public fetchAllBlogPosts(): any {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
		.collection('blog-posts')
		.snapshotChanges()
		.pipe(
			map(docArray => {
				return docArray.map(doc => {
                    const data = doc.payload.doc.data() as any;
					return {
						id: doc.payload.doc.id,
						title: data['title'],
						duration: data['duration'],
						calories: data['calories']
					}
				})
			})
		)
		.subscribe((blog_post: any) => {
            console.log(blog_post)
            //this.store.dispatch(new UI.StopLoading());
            //this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, () => {
            // this.store.dispatch(new UI.StopLoading());
            // this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
            // this.exercisesChanged.next(null);
        }));
    }

    public getEveryBlogPost() {
        this.fbSubs.push(this.db
            .collection('blog-posts')
            .valueChanges()
            .subscribe((blog_post: any) => {
                console.log(blog_post)
                this.store.dispatch(new Blogging.GetAllBlogPosts(blog_post));
        }));
    }

    public cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(blogPost: BlogPost) {
        this.db.collection('blog-posts').add(blogPost);
    }
}