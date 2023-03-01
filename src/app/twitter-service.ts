import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  sendTweet(content: string) {
    const apiUrl = 'https://api.twitter.com/1.1/statuses/update.json';

    const body = { status: content };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.generateAuthorizationHeader(apiUrl, body)
      })
    };

    return this.http.post(apiUrl, body, httpOptions).pipe(map((response: any) => response));
  }

  private generateAuthorizationHeader(url: string, body: any): string {
    const consumerKey = 'YOUR_CONSUMER_KEY';
    const consumerSecret = 'YOUR_CONSUMER_SECRET';
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accessTokenSecret = 'YOUR_ACCESS_TOKEN_SECRET';

    const oauthNonce = this.generateNonce(32);
    const oauthTimestamp = Math.floor(Date.now() / 1000);
    const oauthSignatureMethod = 'HMAC-SHA1';
    const oauthVersion = '1.0';

    const parameters: any = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: oauthNonce,
      oauth_signature_method: oauthSignatureMethod,
      oauth_timestamp: oauthTimestamp,
      oauth_token: accessToken,
      oauth_version: oauthVersion,
      ...body
    };

    const parameterString = Object.keys(parameters).sort().map(key => `${key}=${parameters[key]}`).join('&');
    const signatureBaseString = [ 'POST', encodeURIComponent(url), encodeURIComponent(parameterString) ].join('&');
    const signingKey = encodeURIComponent(consumerSecret) + '&' + encodeURIComponent(accessTokenSecret);

    const oauthSignature = btoa(this.hmacsha1(signingKey, signatureBaseString));
    const authorizationHeader = `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${oauthNonce}", oauth_signature="${oauthSignature}", oauth_signature_method="${oauthSignatureMethod}", oauth_timestamp="${oauthTimestamp}", oauth_token="${accessToken}", oauth_version="${oauthVersion}"`;

    return authorizationHeader;
  }

  private generateNonce(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private hmacsha1(key: string, message: string): string {
    const crypto = require('crypto');
    return crypto.createHmac('sha1', key).update(message).digest('base64');
  }
}
