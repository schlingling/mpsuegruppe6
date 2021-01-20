import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  email: string;
  password: string;
  username: string;

  constructor(public authService: AuthService, public router: Router, private firestore: AngularFirestore,) { }

  ngOnInit(): void {

    
      this.router.navigate(['/start'])
  }



signup() {
  this.authService.signup(this.username, this.email, this.password);
  this.email = this.password = '';
}

login() {
  this.authService.login(this.email, this.password);
  this.email = this.password = '';
}

logout() {
  this.authService.logout();
}

forgotPassword(){
  this.authService.forgotPassword(this.email);
}

switchLoginMode(){
  this.isLoginMode = !this.isLoginMode;
}

}
