import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {TableUser} from '../shared/models/table-user';
import {AuthenticationService} from '../shared/services/authentication.service';
import {SocketService} from '../shared/services/socket.service';
import {TableUsersService} from '../shared/services/table-users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameTablesService} from '../shared/services/game-tables.service';
import {GameTable} from '../shared/models/game-table';

@Component({
  selector: 'app-page-game-table',
  templateUrl: './page-game-table.component.html',
  styleUrls: ['./page-game-table.component.scss']
})
export class PageGameTableComponent implements OnInit, OnDestroy {
  gameWindow: Window;
  path: Object;
  gameTable: GameTable;
  tableUsers: TableUser[];
  gameTableId: number;
  errorMsg: string;
  isJoined = false;
  isTableOwner = false;
  usersCount: number;
  connection;
  connection1;

  constructor(private auth: AuthenticationService,
              private tableUsersService: TableUsersService,
              private gameTablesService: GameTablesService,
              private socket: SocketService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params
      .subscribe((params: Params) => {
        this.gameTableId = params['gameTableId'];
      });
  }

  ngOnInit() {
    this.path = [
      {'title': 'Game Tables', 'link': '/game-tables'},
      {'title': 'Game Table', 'active': true}
    ];

    this.gameTablesService.getById(this.gameTableId).subscribe(data => {
      this.gameTable = data;
      this.computeData();
    });

    this.tableUsersService.getByGameTableId(this.gameTableId).subscribe(data => {
      this.tableUsers = data;
      this.computeData();
    });

    this.connection = this.socket.getTableUserUpdates().subscribe(data => {
      this.tableUsersService.getByGameTableId(this.gameTableId);
    });

    this.connection1 = this.socket.getCreateRoundUpdates().subscribe(data => {
      this.gameTablesService.getById(this.gameTableId);
    });
  }

  computeData() {
    if (this.gameTable && this.tableUsers) {
      this.usersCount = 0;
      if (this.auth.userId === this.gameTable.userId) {
        this.isTableOwner = true;
      }
      for (const user of this.tableUsers) {
        if (user.userId === this.auth.userId) {
          this.isJoined = true;
        }
        this.usersCount++;
      }
    }
  }

  joinTable() {
    const tableUser = new TableUser();
    tableUser.userId = this.auth.userId;
    tableUser.gameTableId = this.gameTableId;

    this.tableUsersService.create(tableUser).subscribe(data => {
      // Success Message
      this.isJoined = true;
    }, error => {
      const data = error.json();
      this.errorMsg = data.message;
    });
  }

  startGame() {
    this.router.navigate(['/game-round/' + this.gameTableId]);
  }

  ngOnDestroy() {
    console.log('table users destroyed');
    this.connection.unsubscribe();
    this.connection1.unsubscribe();
  }

}
