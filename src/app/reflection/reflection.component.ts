import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../shared/interfaces/note';

@Component({
  selector: 'app-reflection',
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit {

  testArray: Observable<Note[]>;


  constructor(private router: Router,    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.testArray = this.firestore.collection<Note>('notes').valueChanges();
  }




  goToRating(){
    this.router.navigate(['/rating'])
  }
}
