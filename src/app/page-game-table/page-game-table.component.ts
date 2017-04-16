import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableUser} from '../shared/models/table-user';
import {AuthenticationService} from '../shared/services/authentication.service';
import {SocketService} from '../shared/services/socket.service';
import {TableUsersService} from '../shared/services/table-users.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-page-game-table',
  templateUrl: './page-game-table.component.html',
  styleUrls: ['./page-game-table.component.scss']
})
export class PageGameTableComponent implements OnInit, OnDestroy {
  path: Object;
  tableUsers: TableUser[];
  gameTableId: number;
  errorMsg: string;
  connection;

  constructor(private auth: AuthenticationService,
              private tableUsersService: TableUsersService,
              private socket: SocketService,
              private route: ActivatedRoute) {
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

    this.tableUsersService.getByGameTableId(this.gameTableId).subscribe(data => {
      this.tableUsers = data;
    });

    this.connection = this.socket.getTableUserUpdates().subscribe(data => {
      this.tableUsersService.getByGameTableId(this.gameTableId);
    });
  }

  joinTable() {
    const tableUser = new TableUser();
    tableUser.userId = this.auth.userId;
    tableUser.gameTableId = this.gameTableId;

    this.tableUsersService.create(tableUser).subscribe(data => {
      // Success Message
    }, error => {
      const data = error.json();
      this.errorMsg = data.message;
    });
  }

  ngOnDestroy() {
    console.log('table users destroyed');
    this.connection.unsubscribe();
  }

}
