import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {GameTablesService} from './game-tables.service';

@Injectable()
export class SocketService {
  private socket;
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private gameTableService: GameTablesService) {
    this.socket = io(this.apiBaseUrl);
  }

  getConnection() {
    return this.socket;
  }

  getGameTableUpdates() {
    const gameTablesObs$ = new Observable(observer => {
      this.socket.on('game-tables-updated', (data) => {
        this.gameTableService.getAll();
      });
    });
    return gameTablesObs$;
  }
}
