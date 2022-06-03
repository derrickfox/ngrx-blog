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
    public blog_posts = new Subject<BlogPost>();
    private fbSubs: Subscription[] = [];
    private new_post!: BlogPost;

    constructor(
        private db: AngularFirestore, 
        private uiService: UiService,
        private store: Store<fromBlogging.State>
    ) {}
    
    public fetchAllBlogPosts(): any {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
            .collection('blog-posts')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    console.log('service -> fetchAllBlogPosts -> docArray', docArray)
                    return docArray.map(doc => {
                        const data = doc.payload.doc.data() as any;
                        return {
                            id: doc.payload.doc.id,
                            title: data['title'],
                            content: data['content'],
                            status: data['status']
                        }
                    })
                })
            )
            .subscribe((blog_posts: any) => {
                console.log('service -> fetchAllBlogPosts -> subscribe -> blog_post' )
                //this.store.dispatch(new UI.StopLoading());
                //this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            }, () => {
                // this.store.dispatch(new UI.StopLoading());
                // this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
                // this.exercisesChanged.next(null);
            }
        ));
    }

    public getEveryBlogPost(): any {
        console.log('service -> getEveryBlogPost');
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
            .collection('blog-posts')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    console.log('service -> docArray', docArray)
                    return docArray.map(doc => {
                        const data = doc.payload.doc.data() as any;
                        return {
                            id: doc.payload.doc.id,
                            title: data['title'],
                            content: data['content'],
                            status: data['status']
                        }
                    })
                })
            )
            .subscribe((blog_post: any) => {
                console.log('service -> getEveryBlogPost -> blog_post', blog_post)
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Blogging.GetAllBlogPosts(blog_post));
            }, () => {
                 this.store.dispatch(new UI.StopLoading());
                 //this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
                // this.exercisesChanged.next(null);
            }
        ));
    }

    public getEveryBlogPost1() {
        console.log('service -> getEveryBlogPost')
        this.fbSubs.push(this.db
            .collection('blog-posts')
            .valueChanges()
            .subscribe((blog_post: any) => {
                console.log('service -> getEveryBlogPost1 -> blog_post', blog_post)
                this.store.dispatch(new Blogging.GetAllBlogPosts(blog_post));
        }));
    }

    public deleteBlogPost(id: string) {
        this.db.collection('blog-posts').doc(id).delete();
    }

    public createNewBlogPost() {
        this.store.dispatch(new Blogging.CreateNewBlogPost({ id: '', title: '', content: '', date: new Date(), author: '', status: '' }));
    }

    public cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(blogPost: BlogPost) {
        this.db.collection('blog-posts').add(blogPost);
    }
}