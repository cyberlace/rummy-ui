import {Injectable} from '@angular/core';
import {RummyApiService} from './rummy-api.service';
import {GameTable} from '../models/game-table';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthenticationService} from './authentication.service';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class GameTablesService {
  private gameTables$ = new BehaviorSubject<GameTable[]>(null);
  private gameTable$ = new BehaviorSubject<GameTable>(null);

  constructor(private api: RummyApiService, private auth: AuthenticationService) {
  }

  getAll(): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    this.api.get('/game-table', options)
      .map(res => {
        const data = res.json();
        return data.map(table => {
          const gameTable = new GameTable();

          gameTable.id = table['id'];
          gameTable.userId = table['user_id'];
          gameTable.userFirstName = table['user_first_name'];
          gameTable.gameType = table['game_type'];
          gameTable.tableType = table['table_type'];
          gameTable.bet = table['bet'];
          gameTable.maxPlayers = table['max_players'];
          gameTable.status = table['status'];

          return gameTable;
        });
      })
      .subscribe(gameTables => {
        this.gameTables$.next(gameTables);
      });
    return this.gameTables$.asObservable();
  }

  getById(id): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    this.api.get('/game-table/' + id, options)
      .map(res => {
        const data = res.json();
        const gameTable = new GameTable();

        gameTable.id = data['id'];
        gameTable.userId = data['user_id'];
        gameTable.userFirstName = data['user_first_name'];
        gameTable.gameType = data['game_type'];
        gameTable.tableType = data['table_type'];
        gameTable.bet = data['bet'];
        gameTable.maxPlayers = data['max_players'];
        gameTable.status = data['status'];

        return gameTable;

      })
      .subscribe(gameTable => {
        this.gameTable$.next(gameTable);
      });
    return this.gameTable$.asObservable();
  }

  create(gameTable: GameTable): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.post('/game-table', gameTable.convertForAPI(), options);
  }
}
