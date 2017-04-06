import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'app-page-tables',
  templateUrl: './page-tables.component.html',
  styleUrls: ['./page-tables.component.scss']
})
export class PageTablesComponent implements OnInit {

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

}
