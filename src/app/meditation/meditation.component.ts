import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
import { Statement } from './../shared/interfaces/statement';
import { Note } from './../shared/interfaces/note';
import { DocumentService } from '../shared/document.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { exit } from 'process';


@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css'],
})
export class MeditationComponent implements OnInit {
  timeLeft: number = 60;
  interval;


  public buttonValue: String = "Start >"
  public startButtonOn: Boolean = true;
  public questions_categories: String[] = [];
  public category: String;
  public all_statements: Statement[] = [];
  public statements_with_category: Statement[] = [];
  public index: number = 0;
  public contentLoaded: Promise<boolean>;
  public choosen_statement: string;
  @ViewChild('buttonVar') el:ElementRef;


  public text_to_save: Note = {};

  title = 'YTIFrameAPI-with-Angular';

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  public videoState: boolean = true;

  constructor(
    private questionsService: QuestionsService,
    private documentService: DocumentService,
    private router: Router,
    private auth: AuthService,
    private _sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.questions_categories = this.questionsService.getCategories();
    console.log(this.questionsService.getCategories());
    this.anzRounds = this.questions_categories.length;

    //Init Music with youtube
    this.video = '-Rf0qydNM70';
    this.init();
  }

  public pausePressed: boolean = false;
  public canPress: boolean = true;
  public anzRounds;


  startTimer() {

    if (this.canPress == true) {
      this.canPress = false;

      if (this.pausePressed == false) {
        
        this.getStatement();
      }
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {

          
          this.timeLeft--;
        } else {
          console.log(this.anzRounds)
          this.anzRounds--;

          if (this.anzRounds <= 0){
            this.router.navigate(['/reflection']);
            exit;
          }


          this.defaultValue = '';
          this.timeLeft = 60;
          this.pausePressed = false;
          this.canPress = true;
          clearInterval(this.interval);
          this.switchButtons()
          this.buttonValue = "Start >"
          this.startButtonOn = !this.startButtonOn;
        }
      }, 200);
    }
  }

  defaultValue: string = '';
  upload() {
    //upload data to firestore
    if (this.defaultValue === ""){
      return;
    }

    console.log('upload');

    this.text_to_save.note = this.defaultValue;

    this.text_to_save.uid = this.auth.userData.value.uid;
    this.text_to_save.statement = this.choosen_statement;
    this.text_to_save.category = this.category;

    this.documentService.setDocument('notes', this.text_to_save);
    this.defaultValue = '';

    //TODO clear textarea
  }

  getStatement() {
    this.all_statements = [];
    this.statements_with_category = [];

    console.log(this.questions_categories);

    this.category = this.questions_categories[0];
    this.questions_categories.splice(0, 1);

    //INITIAL GET-REQEUST FOR MESSAGES
    this.documentService.getDocument('statements').subscribe((data) => {
      this.all_statements = data.map((e) => {
        const q = e.payload.doc.data() as Statement;
        return {
          uid: e.payload.doc.id,
          statement: q.statement,
          category: q.category,
        } as Statement;
      });

      //pick a all statements, that matched the category
      this.all_statements.forEach((q) => {
        console.log(q.category);
        if (q.category === this.category) {
          this.statements_with_category.push(q);
        }
      });

      if (this.statements_with_category.length <= 0) {
        //rufe die endcard-component auf
        console.log(
          'ende, call endcard component' + this.statements_with_category.length
        );
        this.router.navigate(['/reflection']);
        return;
      }

      //pick a random statement of all the matching ones
      this.index = Math.floor(
        Math.random() * this.statements_with_category.length
      );

      this.choosen_statement = this.statements_with_category[
        this.index
      ].statement;
      console.log(this.choosen_statement);

      this.contentLoaded = Promise.resolve(true);
    });
  }






  //YOUTUBE STUFF
  /* 2. Initialize method for YT IFrame API */
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    event.target.playVideo();
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  toogleVideo(){

    if (!this.videoState){
      this.player.playVideo();

    }else{
      this.player.pauseVideo();

    }
    this.videoState=!this.videoState;
  }


  switchButtons(){
    console.log("siwtchBUttons in")
    if (this.startButtonOn == true){
      this.startTimer()
      this.buttonValue = "Upload ^"
      this.startButtonOn = !this.startButtonOn;

    }else{
      this.upload()
    }

    
    

  }

}
