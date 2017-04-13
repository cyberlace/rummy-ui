import {Injectable} from '@angular/core';
import {RummyApiService} from './rummy-api.service';
import {GameTable} from '../models/game-table';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GameTablesService {
  private gameTables$ = new BehaviorSubject<GameTable[]>(null);

  constructor(private api: RummyApiService) {
  }

  getAll(): any {
    this.api.get('/game-table')
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

  create(gameTable: GameTable): any {
    return this.api.post('/game-table', gameTable.convertForAPI());
  }
}
