// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYqEyB0iuKMQImLAZrxyh4sTBL7b51D14",
  authDomain: "ngrx-blog-939e1.firebaseapp.com",
  projectId: "ngrx-blog-939e1",
  storageBucket: "ngrx-blog-939e1.appspot.com",
  messagingSenderId: "872989903559",
  appId: "1:872989903559:web:a973d6419e6657ad448ce2",
  measurementId: "G-LZ3L7EZP8T"
}

export const environment = {
  production: true,
  firebase: firebaseConfig
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
