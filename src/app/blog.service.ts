import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject, Subscription, Timestamp } from "rxjs";
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
    private blogPostsCollection: AngularFirestoreCollection<BlogPost>;

    constructor(
        private db: AngularFirestore, 
        private uiService: UiService,
        private store: Store<fromBlogging.State>
    ) {
        this.blogPostsCollection = db.collection<BlogPost>('blog-posts');
    }
    
    // public fetchAllBlogPosts(): any {
    //     this.store.dispatch(new UI.StartLoading());
    //     this.fbSubs.push(this.db
    //         .collection('blog-posts')
    //         .snapshotChanges()
    //         .pipe(
    //             map(docArray => {
    //                 return docArray.map(doc => {
    //                     const data = doc.payload.doc.data() as any;
    //                     return {
    //                         id: doc.payload.doc.id,
    //                         title: data['title'],
    //                         content: data['content'],
    //                         status: data['status'],
    //                         date: data['date']  
    //                     }
    //                 })
    //             })
    //         )
    //         .subscribe((blog_posts: any) => {
    //             //this.store.dispatch(new UI.StopLoading());
    //             //this.store.dispatch(new Training.SetAvailableTrainings(exercises));
    //         }, () => {
    //             // this.store.dispatch(new UI.StopLoading());
    //             // this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
    //             // this.exercisesChanged.next(null);
    //         }
    //     ));
    // }

    public getEveryBlogPost(): any {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
            .collection('blog-posts')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        console.log("doc.payload.doc.data()", doc.payload.doc.data());
                      const data = doc.payload.doc.data() as BlogPost;
                      const timestampString = data['date'].toString();
                      const regex = /Timestamp\(seconds=(\d+), nanoseconds=(\d+)\)/;
                      const match = regex.exec(timestampString);
                      let date: Date | undefined = undefined; // initialize to undefined
                  
                      if (match) {
                        const seconds = Number(match[1]);
                        const nanoseconds = Number(match[2]);
                        date = new Date(seconds * 1000 + nanoseconds / 1000000);
                        console.log(date);
                      }
                  
                      return {
                        id: doc.payload.doc.id,
                        title: data['title'],
                        content: data['content'],
                        status: data['status'],
                        date: date // safe to use outside the if statement
                      };
                    });
                  })
            )
            .subscribe((blog_post: any) => {
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Blogging.GetAllBlogPosts(blog_post));
            }, () => {
                 this.store.dispatch(new UI.StopLoading());
                 //this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
                // this.exercisesChanged.next(null);
            }
        ));
    }

    // public searchFirebase(searchTerm: string): Observable<BlogPost[]> {
    //     const collection: AngularFirestoreCollection<BlogPost> = this.db.collection('blog-posts', ref =>
    //       ref.where('title', '>=', searchTerm)
    //         .where('title', '<=', searchTerm + '\uf8ff')
    //         .where('content', '>=', searchTerm)
    //         .where('content', '<=', searchTerm + '\uf8ff')
    //     );
    
    //     return collection.snapshotChanges().pipe(
    //       map(docArray => {
    //         return docArray.map(doc => {
    //           const data = doc.payload.doc.data() as BlogPost;
    //           const id = doc.payload.doc.id;
    //           return { id, ...data };
    //         });
    //       })
    //     );
    // }

    public getEveryBlogPost1() {
        this.fbSubs.push(this.db
            .collection('blog-posts')
            .valueChanges()
            .subscribe((blog_post: any) => {
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

    public updateDataToDatabase(blogPost: BlogPost) {
        this.db.collection('blog-posts').doc(blogPost.id).update(blogPost);
    }

    public editBlogPost(blogPost: BlogPost) {
        this.store.dispatch(new Blogging.UpdateBlogPost(blogPost));
    }

    private viewBlogPost(blogPostId: string) {
        const collectionRef = this.db.collection('myCollection');

        // Get a reference to the document you want to fetch
        const docRef = collectionRef.doc('myDocumentId');
        
        // Subscribe to the Observable to retrieve the document data
        docRef.get().subscribe((doc) => {
          if (doc.exists) {
            console.log(doc.data());
          } else {
            console.log("No such document!");
          }
        }, (error) => {
          console.log("Error getting document:", error);
        });

    }
}