import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = {
      id: null, email: this.loginService.getUser(), password: null
    };
    if (!this.user) {
      this.router.navigate(['']);
    }
  }

}
