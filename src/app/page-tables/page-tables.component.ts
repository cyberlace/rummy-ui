import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {GameTablesService} from '../shared/services/game-tables.service';
import {GameTable} from '../shared/models/game-table';
import {SocketService} from "../shared/services/socket.service";

@Component({
  selector: 'app-page-tables',
  templateUrl: './page-tables.component.html',
  styleUrls: ['./page-tables.component.scss']
})
export class PageTablesComponent implements OnInit {
  gameTables: GameTable[];

  constructor(private auth: AuthenticationService, private gameTablesService: GameTablesService, private socket: SocketService) {
  }

  ngOnInit() {
    this.gameTablesService.getAll().subscribe(data => {
      this.gameTables = data;
    });

    this.socket.getGameTableUpdates().subscribe();
  }

}
