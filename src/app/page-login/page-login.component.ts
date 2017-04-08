import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  private emailError: string;
  private passwordError: string;
  private loginError: string;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = true;

    if (username === '') {
      this.emailError = 'Email cannot be empty.';
      isValid = false;
    } else if (!EMAIL_REGEXP.test(username)) {
      this.emailError = 'Invalid Email address.';
      isValid = false;
    }

    if (password === '') {
      this.passwordError = 'Password cannot be empty.';
      isValid = false;
    }
    if (isValid) {
      this.auth.login(username, password).subscribe(res => {
        this.router.navigate(['/tables']);
      }, err => {
        const data = err.json();
        this.loginError = data.message;
      });
    }
  }
}
