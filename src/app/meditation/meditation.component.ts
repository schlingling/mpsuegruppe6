import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
<<<<<<< HEAD
import { Statement } from './../shared/statement';
import { TextToSave } from './../shared/text';
=======
import { Statement } from './../shared/interfaces/statement';
import { Note } from './../shared/interfaces/note';
import { DocumentService } from '../shared/document.service';
import { Router } from '@angular/router';
>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109


@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit {

  timeLeft: number = 60;
  interval;

  public questions_categories: String[] = [];
  public category: String;
  public all_statements: Statement[] = [];
  public statements_with_category: Statement[] = [];
  public index: number = 0;
  public contentLoaded: Promise<boolean>;
  public choosen_statement: String;

<<<<<<< HEAD
  public text_to_save: TextToSave = {};



  constructor(private questionsService: QuestionsService) { }
=======
  public text_to_save: Note = {};



  constructor(private questionsService: QuestionsService, private documentService: DocumentService, private router: Router) { }
>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109

  ngOnInit(): void {

    this.questions_categories = this.questionsService.getCategories()
<<<<<<< HEAD
  }


  public canPress: boolean = true;

  startTimer() {
    
    if(this.canPress == true){
      this.canPress = false;

      if(this.pausePressed == false){     
=======
    console.log(this.questionsService.getCategories())
  }

  public pausePressed: boolean = false;
  public canPress: boolean = true;

  startTimer() {

    if(this.canPress == true){
      this.canPress = false;

      if(this.pausePressed == false){
>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109
        this.getStatement()
      }
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {

<<<<<<< HEAD
          
=======

>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109
          this.timeLeft = 60;
          this.pausePressed = false;
          this.canPress = true;
          clearInterval(this.interval);        }
      },100)
    }

<<<<<<< HEAD
    
  }

  public pausePressed: boolean = false;
  upload(text_from_html: string) {
    //upload data to firestore
   
    this.text_to_save.text = text_from_html;

    //TODO
    this.text_to_save.user_id = "123123123";
    this.text_to_save.question_id = "345345345";

    this.questionsService.setTexts(this.text_to_save);
  }

=======

  }

  upload(text_from_html: string) {
    //upload data to firestore

    this.text_to_save.note = text_from_html;

    //TODO
    this.text_to_save.uid = "123123123";
    this.text_to_save.statement = "345345345";

    this.documentService.setDocument('notes',this.text_to_save);
  }

>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109
  getStatement(){
    this.all_statements = []
    this.statements_with_category = []

    console.log(this.questions_categories)

    this.category = this.questions_categories[0]
    this.questions_categories.splice(0,1)
<<<<<<< HEAD
    

    //INITIAL GET-REQEUST FOR MESSAGES
    this.questionsService.getQuestions('statements').subscribe((data) => {
      this.all_statements = data.map((e) => {
        const q = e.payload.doc.data() as Statement;
        return {
          id: e.payload.doc.id,
=======


    //INITIAL GET-REQEUST FOR MESSAGES
    this.documentService.getDocument('statements').subscribe((data) => {
      this.all_statements = data.map((e) => {
        const q = e.payload.doc.data() as Statement;
        return {
          uid: e.payload.doc.id,
>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109
          statement: q.statement,
          category: q.category
        } as Statement;
      });

      //pick a all statements, that matched the category
      this.all_statements.forEach((q) => {
        console.log(q.category)
        if (q.category === this.category) {
          this.statements_with_category.push(q);
        }
      });

      if(this.statements_with_category.length <= 0){
        //rufe die endcard-component auf
        console.log("ende, call endcard component" + this.statements_with_category.length);
<<<<<<< HEAD
=======
        this.router.navigate(['/reflection']);
>>>>>>> 0e9e5995c87749578dbb82589de8796828bf9109
        return;
      }

      //pick a random statement of all the matching ones
      this.index = Math.floor(Math.random() * this.statements_with_category.length);

      this.choosen_statement = this.statements_with_category[this.index].statement
      console.log(this.choosen_statement)

      this.contentLoaded = Promise.resolve(true);
    });




  }

}
