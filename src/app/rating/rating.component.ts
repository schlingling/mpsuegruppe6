import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl } from '@angular/forms';
import { DocumentService } from '../shared/document.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { Rating } from './../shared/interfaces/rating';
import { AngularFirestore } from '@angular/fire/firestore';
import { elementAt, map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;

  mode: string = 'slider';

  ratings: Rating[] = [];
  filtered_ratings = [];

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

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.firestore.collection<Rating>('ratings').snapshotChanges().subscribe(data=>{
      this.ratings=data.map(e=>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      });
      console.log(this.ratings)

    })
  }

  ngAfterViewInit() {}

  submitRatingAndProceed() {
    console.log(this.value);

    var rating: Rating = {
      uid: this.auth.userData.uid,
      rating: this.value,
      timestamp: Date.now(),
    };

    this.documentService.setDocument('ratings', rating);
    this.mode = 'chart';
    this.prepareData();
    this.lineChartMethod()
  }

  prepareData() {
    this.ratings = this.ratings.filter(e => e.uid == this.auth.userData.uid);
    this.ratings.sort((a,b)=>a.timestamp-b.timestamp)
    this.filtered_ratings = this.ratings.map(e=>{
      return {x: new Date(e.timestamp), y:e.rating}
    })

    console.log(this.filtered_ratings)

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
          xAxes: [{
            type: 'time',
            distribution: 'linear',
          }],
          title: {
            display: false,
          }
        }
      },
    },);
  }
}
