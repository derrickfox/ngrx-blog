import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()

export class UiService {
  
  constructor(private snackbar: MatSnackBar, private http: HttpClient) {}
  
  showSnackbar(message: any, action: any, duration: any) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
  
  tweet(tweetText: string) {
    // Send a POST request to your server with the tweet text
    this.http.post('/api/tweet', { text: tweetText }).subscribe(
      () => {
        // If the tweet was sent successfully, show a toast message
        console.log('Tweeted!');
      },
      (error) => {
        // If there was an error, log it to the console
        console.error(error);
      }
      );
    }
  }