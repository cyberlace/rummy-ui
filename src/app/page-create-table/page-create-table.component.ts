import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {GameTablesService} from '../shared/services/game-tables.service';
import {GameTable} from '../shared/models/game-table';

@Component({
  selector: 'app-page-create-table',
  templateUrl: './page-create-table.component.html',
  styleUrls: ['./page-create-table.component.scss']
})
export class PageCreateTableComponent implements OnInit {
  private formError: string;

  constructor(private auth: AuthenticationService, private router: Router, private gameTableService: GameTablesService) {
  }

  ngOnInit() {
  }

  createTable(tableType, gameType, bet, maxPlayers) {
    const gameTable = new GameTable();
    gameTable.userId = this.auth.userId;
    gameTable.tableType = tableType;
    gameTable.gameType = gameType;
    gameTable.bet = bet;
    gameTable.maxPlayers = maxPlayers;

    this.gameTableService.create(gameTable).subscribe(data => {
      this.router.navigate(['/game-tables']);
    }, error => {
      const data = error.json();
      this.formError = data.message;
    });
  }
}
