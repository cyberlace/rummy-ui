import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private userMenu: string;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  toggleUserMenu() {
    if (this.userMenu === 'open') {
      this.userMenu = '';
    } else {
      this.userMenu = 'open';
    }
  }
}
