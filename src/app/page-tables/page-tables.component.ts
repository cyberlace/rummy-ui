import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {GameTablesService} from '../shared/services/game-tables.service';
import {GameTable} from '../shared/models/game-table';
import {SocketService} from '../shared/services/socket.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-page-tables',
  templateUrl: './page-tables.component.html',
  styleUrls: ['./page-tables.component.scss']
})
export class PageTablesComponent implements OnInit, OnDestroy {
  gameTables: GameTable[];
  connection;

  constructor(private auth: AuthenticationService,
              private gameTablesService: GameTablesService,
              private socket: SocketService) {
  }

  ngOnInit() {
    this.gameTablesService.getAll().subscribe(data => {
      this.gameTables = data;
    });

    this.connection = this.socket.getGameTableUpdates().subscribe(data => {
      this.gameTablesService.getAll();
    });

  }

  ngOnDestroy() {
    console.log('game table destroyed');
    this.connection.unsubscribe();
  }
}
