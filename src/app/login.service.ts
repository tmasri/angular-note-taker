import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: User = null;
  private userListener: Subject<User> = new Subject<User>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUser() {
    return this.getCookie('email');
  }

  checkLoggedIn() {
    if (this.getCookie('email') !== '') {
      this.router.navigate(['/home']);
    }
  }

  createUser(user: User) {
    this.http.post<{ exists: boolean }>(
      'http://localhost:3000/api/users', user
    ).subscribe( data => {
      if (!data.exists) {
        this.user = user;
        this.user.password = null;
        this.userListener.next(user);
        this.setCookie('email', user.email);
        this.router.navigate(['/building-account']);
      } else {
        this.userListener.next(null);
      }
    });
  }

  getUserUpdateListener() {
    return this.userListener.asObservable();
  }

  login(user: User) {
    this.http.post<{ exists: boolean }>(
      'http://localhost:3000/api/users/check', user
    ).subscribe( data => {
      if (data.exists) {
        user.password = '';
        this.user = user;
        this.userListener.next(user);
        this.setCookie('email', user.email);
        this.router.navigate(['/home']);
      } else {
        this.deleteCookie('email');
        this.userListener.next(null);
      }
    });
  }

  // COOKIES
  setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
  }

  getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
  }

  deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }

}
