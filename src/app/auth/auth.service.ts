import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './login/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    //this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        console.log('Success!');
        this.user.next(new User(userData.user.email, '0', 'asdf', new Date()));

        this.router.navigate(['/start']);
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
        this.user.next(new User(userData.user.email, '0', 'asdf', new Date()));
        this.router.navigate(['/start']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  //TODO
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  //TODO
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
