import {Injectable} from '@angular/core';
import {RummyApiService} from './rummy-api.service';
import {AuthenticationService} from './authentication.service';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class GameRoundsService {

  constructor(private api: RummyApiService, private auth: AuthenticationService) {
  }

  startGame(gametableId): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/start/' + gametableId, options).map(data => {
      return data.json();
    });
  }

  getRoundInfo(gametableId): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/get-info/' + gametableId, options).map(data => {
      const roundInfo = data.json();
      roundInfo.player_deck = JSON.parse(roundInfo.player_deck);
      roundInfo.open_deck = JSON.parse(roundInfo.open_deck);
      return roundInfo;
    });
  }

}
