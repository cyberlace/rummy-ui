import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-validate-email',
  templateUrl: './page-validate-email.component.html',
  styleUrls: ['./page-validate-email.component.scss']
})
export class PageValidateEmailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/login']);
  }

}
