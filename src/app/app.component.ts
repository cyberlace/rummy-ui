import {Component} from '@angular/core';
import {AuthenticationService} from './shared/services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthenticationService,
              private router: Router) {
    if (!auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
