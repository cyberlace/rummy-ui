import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userMenu: string;
  public userFirstName: string;
  public userLastName: string;
  public userEmail: string;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.userFirstName = this.auth.firstName;
    this.userLastName = this.auth.lastName;
    this.userEmail = this.auth.email;
  }

  toggleUserMenu() {
    if (this.userMenu === 'open') {
      this.userMenu = '';
    } else {
      this.userMenu = 'open';
    }
  }

  logout() {
    this.auth.logout();
  }
}
