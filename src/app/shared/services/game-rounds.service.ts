import {Injectable} from '@angular/core';
import {RummyApiService} from './rummy-api.service';
import {AuthenticationService} from './authentication.service';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class GameRoundsService {

  constructor(private api: RummyApiService, private auth: AuthenticationService) {
  }

  startGame(gameTableId): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/start/' + gameTableId, options).map(data => {
      return data.json();
    });
  }

  getRoundInfo(gameTableId): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/get-info/' + gameTableId, options).map(data => {
      const roundInfo = data.json();
      roundInfo.player_deck = JSON.parse(roundInfo.player_deck);
      return roundInfo;
    });
  }

  pickOpenCard(gameTableId: number) {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/pick-open-card/' + gameTableId, options).map(data => {
      const roundInfo = data.json();
      roundInfo.player_deck = JSON.parse(roundInfo.player_deck);
      return roundInfo;
    });
  }

  pickClosedCard(gameTableId: number) {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/pick-closed-card/' + gameTableId, options).map(data => {
      const roundInfo = data.json();
      roundInfo.player_deck = JSON.parse(roundInfo.player_deck);
      return roundInfo;
    });
  }

  dropCard(gameTableId: number, card: string) {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.get('/table-rounds/drop-card/' + gameTableId + '/' + card, options).map(data => {
      const roundInfo = data.json();
      roundInfo.player_deck = JSON.parse(roundInfo.player_deck);
      return roundInfo;
    });
  }
}
