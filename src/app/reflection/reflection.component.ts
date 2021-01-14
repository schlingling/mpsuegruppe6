import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../shared/interfaces/note';
import { QuestionsService } from '../shared/questions.service';
import { Statement } from './../shared/interfaces/statement';
import { DocumentService } from '../shared/document.service';
import { AuthService} from './../auth/auth.service';

@Component({
  selector: 'app-reflection',
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit {

  testArray: Observable<Note[]>;
  public questions_categories: String[] = [];
  public uid: String;
  public all_notes: Note[] = [];
  public categories_and_notes: [String, String []] [] = [];
  //public notes: String [] = [];
  public notes: Note[] = [];
  public choosen_notes: Note[] = [];



//SEE FOR MORE INFOS TO REQUEST DATA FROM FIREBASE: https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

  constructor(private documentService: DocumentService, private questionsService: QuestionsService, private router: Router, private firestore: AngularFirestore, private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.testArray = this.firestore.collection<Note>('notes').valueChanges();
    //this.uid = this.auth.userData.value.uid;

    //Wait for user to be logged in, then set Sub for Ratings
    this.auth.firebaseAuth.onAuthStateChanged((user) => {        
      this.firestore
        .collection<Note>('notes', (ref) => ref.where('uid', '==', user.uid)) //FILTER FOR USERDATA
        .snapshotChanges()
        .subscribe((data) => {
          this.notes = data.map((e) => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            };
          });

          //Get Categories from requested notes
          this.notes.forEach((q) => {
            if (!this.questions_categories.includes(q.category)) {
              this.questions_categories.push(q.category);
            }
          });

          this.getPostStatements()

        });
    });

    

  }


  getPostStatements(){
    //INITIAL GET-REQEUST FOR MESSAGES

    console.log(this.notes)
    this.notes.forEach((note) =>{
      if (this.questions_categories.includes(note.category)) {
       this.choosen_notes.push(note);
    }});

    this.questions_categories.forEach((category) =>{
      var categorie_and_note: [String, String []] = ["test", []];
      categorie_and_note[0] = category;
      this.notes.forEach((note) =>{
        if (note.category === category){
          categorie_and_note[1].push(note.note)
        }
      });

      this.categories_and_notes.push(categorie_and_note)
    });

    console.log(this.categories_and_notes)

}


  goToRating(){
    this.router.navigate(['/rating'])
  }
}
