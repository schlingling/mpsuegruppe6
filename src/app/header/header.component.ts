import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  private userSub: Subscription;

  isSS = false;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
    setTimeout(()=>{
      this.closeNavbar();
    },2000)

  }

  closeNavbar(){
    this.navbarOpen=false;
  }

  logout() {
    this.authService.logout();
  }

}
