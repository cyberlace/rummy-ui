import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  private isUserLoggedIn: boolean;
  private username: string;

  constructor(private router: Router) {
    this.getUserDetails();
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  private getUserDetails() {
    if (!localStorage.getItem('isUserLoggedIn')) {
      localStorage.setItem('isUserLoggedIn', 'false');
    }
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', '');
    }
    this.isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    this.username = localStorage.getItem('username');
  }

  login(username: string, password: string): boolean {
    if (username !== '' && password !== '') {
      localStorage.setItem('isUserLoggedIn', 'true');
      localStorage.setItem('username', username);
      this.isUserLoggedIn = true;
      this.username = username;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.setItem('isUserLoggedIn', 'false');
    localStorage.setItem('username', '');

    this.isUserLoggedIn = false;
    this.username = '';

    this.router.navigate(['/login']);
  }

  signUp(fullName: string, email: string, password: string) {
    if (fullName !== '' && email !== '' && password !== '') {
      return true;
    } else {
      return false;
    }
  }
}
