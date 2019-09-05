import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private userSubscribe: Subscription;
  private signupForm: NgForm;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.userSubscribe = this.loginService.getUserUpdateListener().subscribe( user => {
      if (!user) {
        // user already exists, give new email
        document.getElementById('email').style.border = '1px solid red';
        document.getElementById('error').style.display = 'block';
      }
    });
  }

  createUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.signupForm = form;

    const user: User = {
      id: null,
      email: form.value.email,
      password: form.value.password
    };

    this.loginService.createUser(user);

  }

}
