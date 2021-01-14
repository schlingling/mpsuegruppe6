import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Note } from '../shared/interfaces/note';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/interfaces/user';
import { NumberSymbol } from '@angular/common';


@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit {

  amountUsers:number;
  amountNotes:number;
  constructor(private router: Router, private auth: AuthService, private firestore: AngularFirestore){}


  ngOnInit(): void {
    //Wait for user to be logged in, then set Sub for Ratings
    this.auth.firebaseAuth.onAuthStateChanged((user) => {        

      this.firestore
        .collection<User>('users') //FILTER FOR USERDATA
        .snapshotChanges()
        .subscribe((data) => {
          this.amountUsers = data.length
          console.log(this.amountUsers)
        });

        this.firestore
        .collection<Note>('notes') //FILTER FOR USERDATA
        .snapshotChanges()
        .subscribe((data) => {
          this.amountNotes = data.length
          console.log(this.amountNotes)
        });
    });

  }


  redirectToAbout(){
    this.router.navigate(['/about']);

  }

  redirectToFrage(){
    this.router.navigate(['/questions']);

  }



}

