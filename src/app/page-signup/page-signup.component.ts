import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {RummyApiService} from '../shared/services/rummy-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-signup',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.scss']
})
export class PageSignupComponent implements OnInit {
  private registerError: string;
  private firstNameError: string;
  private lastNameError: string;
  private emailError: string;
  private passwordError: string;
  private confirmPasswordError: string;
  private acceptTermsError: boolean;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  signUp(firstName, lastName, email, password, confirmPassword, acceptTerms) {
    const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = true;

    if (firstName === '') {
      this.firstNameError = 'First Name cannot be empty.';
      isValid = false;
    } else if (firstName.lenth > 50) {
      this.firstNameError = 'First Name should not exceed 50 characters.';
      isValid = false;
    } else {
      this.firstNameError = '';
    }

    if (lastName === '') {
      this.lastNameError = 'Last Name cannot be empty.';
      isValid = false;
    } else if (lastName.lenth > 50) {
      this.lastNameError = 'Last Name should not exceed 50 characters.';
      isValid = false;
    } else {
      this.lastNameError = '';
    }

    if (email === '') {
      this.emailError = 'Email cannot be empty.';
      isValid = false;
    } else if (!EMAIL_REGEXP.test(email)) {
      this.emailError = 'Invalid Email address.';
      isValid = false;
    } else {
      this.emailError = '';
    }

    if (password === '') {
      this.passwordError = 'Password cannot be empty.';
      isValid = false;
    } else if (password.length < 8) {
      this.passwordError = 'Password should be minimum 8 characters.';
      isValid = false;
    } else if (password.length > 20) {
      this.passwordError = 'Password should not exceed 20 characters.';
      isValid = false;
    } else {
      this.passwordError = '';
    }

    if (confirmPassword === '') {
      this.confirmPasswordError = 'Confirm Password cannot be empty.';
      isValid = false;
    } else if (password !== confirmPassword) {
      this.confirmPasswordError = 'Confirm Password did not match Password.';
      isValid = false;
    } else {
      this.confirmPasswordError = '';
    }

    if (!acceptTerms) {
      this.acceptTermsError = !acceptTerms;
      isValid = false;
    } else {
      this.acceptTermsError = !acceptTerms;
    }

    if (isValid) {
      this.auth.signUp(firstName, lastName, email, password).subscribe(res => {
        this.router.navigate(['/validate-email']);
      }, err => {
        const data = err.json();
        this.registerError = data.message;
      });
    }
  }
}
