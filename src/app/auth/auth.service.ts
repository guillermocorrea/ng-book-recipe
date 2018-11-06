import { reject } from 'q';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  private _token: string = null;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          this.isAuthenticated = true;
          this.getToken().then((token) => { this._token = token; });
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.isAuthenticated = false;
  }

  getToken(): Promise<string> {
    return new Promise((resolve) => {
      firebase.auth().currentUser.getIdToken()
        .then((token: string) => {
          this.isAuthenticated = true;
          this._token = token;
          resolve(token);
        });
    });
  }

  getTokenSync() {
    return this._token;
  }
}
