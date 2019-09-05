import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userSubscribe: Subscription;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.loginService.checkLoggedIn();
    this.userSubscribe = this.loginService.getUserUpdateListener().subscribe( user => {
      if (!user) {
        // user doesnt exist
        document.getElementById('email').style.border = '1px solid red';
        document.getElementById('error').style.display = 'block';
      }
    });

  }

  randomEmailGenerator() {
    // generate a random email and display it on the form
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user: User = {
      id: null,
      email: form.value.email,
      password: form.value.password
    };

    this.loginService.login(user);
  }

}
