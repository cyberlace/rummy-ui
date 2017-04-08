import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RummyApiService} from './rummy-api.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private isUserLoggedIn: boolean;
  private firstName: string;
  private lastName: string;
  private email: string;
  private token: string;

  constructor(private router: Router, private api: RummyApiService, private http: Http) {
    this.getUserDetails();
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  private getUserDetails() {
    this.initLocalStorage();
    this.isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    this.token = localStorage.getItem('token');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
  }

  private initLocalStorage() {
    if (!localStorage.getItem('isUserLoggedIn')) {
      localStorage.setItem('isUserLoggedIn', 'false');
    }
    if (!localStorage.getItem('firstName')) {
      localStorage.setItem('firstName', '');
    }
    if (!localStorage.getItem('lastName')) {
      localStorage.setItem('lastName', '');
    }
    if (!localStorage.getItem('email')) {
      localStorage.setItem('email', '');
    }
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    }
  }

  login(email: string, password: string): any {
    return this.api.post('/user/login', {'email': email, 'password': password})
      .map(res => {
        const data = res.json();
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);

        this.isUserLoggedIn = false;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.token = data.token;
      });
  }


  logout() {
    localStorage.setItem('isUserLoggedIn', 'false');
    localStorage.setItem('firstName', '');
    localStorage.setItem('lastName', '');
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');

    this.isUserLoggedIn = false;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.token = '';

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
