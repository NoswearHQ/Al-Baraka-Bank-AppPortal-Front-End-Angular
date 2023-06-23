import { Component, OnInit } from '@angular/core';
import {LoginT24Service} from '../login-t24.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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
      setTimeout(() => { 
        self.location.reload();
        
    }, 500);
  }

}
