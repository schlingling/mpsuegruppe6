import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private authService: AuthService) { }

  status1: boolean;
  status2 : boolean;




  ngOnInit(): void {
    this.status1=this.authService.isRouteAuthenticated();
    this.status2 = this.authService.isLoggedIn;

    console.log(this.status1);
    console.log(this.status2);
  }

}
