import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  private emailError: string;
  private passwordError: string;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (username === '') {
      this.emailError = 'Email cannot be empty.';
    } else if (!EMAIL_REGEXP.test(username)) {
      this.emailError = 'Invalid Email address.';
    }

    if (password === '') {
      this.passwordError = 'Password cannot be empty.';
    }

    if (this.auth.login(username, password)) {
      this.router.navigate(['/tables']);
    }
  }
}
