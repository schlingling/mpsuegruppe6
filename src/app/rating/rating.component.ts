import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Chart } from 'chart.js';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl } from '@angular/forms';
import { DocumentService } from '../shared/document.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { Rating } from './../shared/interfaces/rating';
import { AngularFirestore } from '@angular/fire/firestore';
import { elementAt, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { Note } from '../shared/interfaces/note';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;

  mode: string = 'slider';

  ratings: Rating[] = [];
  notes: Note[] = [];

  notes_labels = [];
  notes_vals = {};
  notes_vals2 = [];


  filtered_ratings = [];
  userId;

  //notes: Observable<Note[]>;

  //Parameters for slider
  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 7,
    showTicks: true,
    tickStep: 7,
  };

  //Parameters for chart
  lineChart: any;
  barChart: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    //Wait for user to be logged in, then set Sub for Ratings
    this.auth.firebaseAuth.onAuthStateChanged((user) => {
      this.firestore
        .collection<Rating>('ratings', (ref) =>
          ref.where('uid', '==', user.uid)
        ) //FILTER FOR USERDATA
        .snapshotChanges()
        .subscribe((data) => {
          this.ratings = data.map((e) => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            };
          });
        });

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

          console.log(this.notes);
        });
    });
  }

  ngAfterViewInit() {}

  submitRatingAndProceed() {
    console.log(this.value);

    var rating: Rating = {
      uid: this.auth.userData.value.uid,
      rating: this.value,
      timestamp: Date.now(),
    };

    this.documentService.setDocument('ratings', rating);
    this.mode = 'chart';
    this.prepareData();
    this.lineChartMethod();
    this.barChartMethod();
  }

  prepareData() {

    //Get Data for lineplot
    this.ratings.sort((a, b) => a.timestamp - b.timestamp);
    this.filtered_ratings = this.ratings.map((e) => {
      return { x: new Date(e.timestamp), y: e.rating };
    });

    //Get Data for barplot
    this.notes.forEach((n) => {
      if (!this.notes_labels.includes(n.statement)) {
        this.notes_labels.push(n.statement);
      }
    });
    this.notes_labels.forEach((l) => {
      this.notes.forEach((n) => {
        if (!(l in this.notes_vals)) {
          this.notes_vals[l] = 0;
        }
        if (l == n.statement) {
          this.notes_vals[l] += 1;
        }
      });
    });


    for ( var key in this.notes_vals){
      console.log(key)
      this.notes_vals2.push(this.notes_vals[key])
    }
    console.log(this.notes_vals);
    console.log(this.notes_vals2);

  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Wohlfühlscore',
            data: this.filtered_ratings,

            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'hour',
              },
            },
          ],
          title: {
            display: false,
          },
        },
      },
    });
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.notes_labels,
        datasets: [
          {
            label: '# of Notes',
            data: this.notes_vals2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {

        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,

              },
            },
          ],
          xAxes: [{
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
            }
        }]
        },
      },
    });
  }
}
