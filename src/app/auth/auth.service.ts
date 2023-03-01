
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private uiService: UiService,
        private store: Store<{ui: fromRoot.State}>
    ) { }

    initAuthListener() {
        this.afAuth.authState.subscribe((user: any) => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/']);
            } else {
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/login'])
            }
        });
    }
    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.createUserWithEmailAndPassword(
                authData.email, 
                authData.password
            ).then((result: any) => {
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
            })
            .catch((error: { message: any; }) => {
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
                console.log(error);
            });
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then((result: any) => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        })
        .catch((error: { message: any; }) => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
            console.log(error);
        });
    }

    logout() {
        this.afAuth.signOut();
    }

}