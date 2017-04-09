import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {GameTablesService} from '../shared/services/game-tables.service';
import {GameTable} from '../shared/models/game-table';

@Component({
  selector: 'app-page-tables',
  templateUrl: './page-tables.component.html',
  styleUrls: ['./page-tables.component.scss']
})
export class PageTablesComponent implements OnInit {
  gameTables: GameTable[];

  constructor(private auth: AuthenticationService, private gameTablesService: GameTablesService) {
  }

  ngOnInit() {
    this.gameTablesService.getAll().subscribe(data => {
      this.gameTables = data;
    });
  }

}
