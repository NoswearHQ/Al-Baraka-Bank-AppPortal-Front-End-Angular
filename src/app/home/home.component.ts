import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import {LoginT24Service} from '../login-t24.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: LoginT24Service
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}


  ngOnInit(): void {
  }

  currentUser: User;

 
  logout() {
      this.authenticationService.logout();
      this.router.navigate(['']);
  }

}
