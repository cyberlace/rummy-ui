import {Injectable} from '@angular/core';
import {RummyApiService} from './rummy-api.service';
import {TableUser} from '../models/table-user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthenticationService} from './authentication.service';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class TableUsersService {
  private tableUsers$ = new BehaviorSubject<TableUser[]>(null);

  constructor(private api: RummyApiService, private auth: AuthenticationService) {
  }

  getByGameTableId(gameTableId): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    this.api.get('/table-user/' + gameTableId, options)
      .map(res => {
        const data = res.json();
        return data.map(table => {
          const tableUser = new TableUser();

          tableUser.id = table['id'];
          tableUser.userId = table['user_id'];
          tableUser.userFirstName = table['user_first_name'];
          tableUser.gameTableId = table['game_table_id'];
          tableUser.position = table['position'];
          tableUser.status = table['status'];

          return tableUser;
        });
      })
      .subscribe(tableUsers => {
        this.tableUsers$.next(tableUsers);
      });
    return this.tableUsers$.asObservable();
  }

  create(tableUser: TableUser): any {
    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});

    return this.api.post('/table-user', tableUser.convertForAPI(), options);
  }
}
