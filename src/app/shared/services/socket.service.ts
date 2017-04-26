import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class SocketService {
  private socket;
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private auth: AuthenticationService) {
    if (this.auth.isUserLoggedIn) {
      this.socket = io(this.apiBaseUrl, {query: 'current_user_id=' + this.auth.userId});
    }
  }

  initConnection() {
    if (this.auth.isUserLoggedIn) {
      this.socket = io(this.apiBaseUrl, {query: 'current_user_id=' + this.auth.userId});
    }
  }

  getGameTableUpdates() {
    const observable$ = new Observable(observer => {
      this.socket.on('game-tables-updated', (data) => {
        console.log('game-table-updated');
        observer.next(data);
      });
    });
    return observable$;
  }

  getTableUserUpdates() {
    const observable$ = new Observable(observer => {
      this.socket.on('table-users-updated', (data) => {
        console.log('table-users-updated');
        observer.next(data);
      });
    });
    return observable$;
  }

  getCreateRoundUpdates() {
    const observable$ = new Observable(observer => {
      this.socket.on('table-round-created', (data) => {
        console.log('table-round-created');
        observer.next(data);
      });
    });
    return observable$;
  }
}
