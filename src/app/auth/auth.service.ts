import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { User } from '../shared/interfaces/user';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData= new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData.next(user)


        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        //console.log("localstorage")
        //console.log(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signup(username: string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        console.log('Success!');
        //this.user.next(new User(userData.user.email, '0', 'asdf', new Date()));
        this.setUserData(userData.user, username).then(() => {
          console.log(userData.user)

          //TODO: Verification Mail
          this.router.navigate(['/start']);
        });
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        console.log('Nice, it worked!');
        //TODO: Make user with autologout
        console.log(userData)
        this.setUserData(userData.user).then(() => {
          this.router.navigate(['/start']);
        });
      })
      .catch((err) => {
        console.log('Something went wrdfdong:', err.message,);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user, username?:string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  logout() {
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  //TODO
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
    return this.firebaseAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //TODO: Email verifyen
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return user !== null ? true : false;
  }
}
