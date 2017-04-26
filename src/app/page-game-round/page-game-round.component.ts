import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SocketService} from '../shared/services/socket.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {GameRoundsService} from '../shared/services/game-rounds.service';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-page-game-round',
  templateUrl: './page-game-round.component.html',
  styleUrls: ['./page-game-round.component.scss']
})
export class PageGameRoundComponent implements OnInit, OnDestroy {
  gameTableId: number;
  path: Object;
  message: string;
  connection;
  gameInfo: any;
  currentUser: User;
  currentUserPosition: number;
  players = [];
  otherPlayers = [];
  playerCount: number;
  selectedCards = [];
  openCard: string;
  pickedCard: string;

  constructor(private auth: AuthenticationService,
              private gameRoundsService: GameRoundsService,
              private socket: SocketService,
              private route: ActivatedRoute) {
    this.route.params
      .subscribe((params: Params) => {
        this.gameTableId = params['gameTableId'];
      });

    this.connection = this.socket.getCreateRoundUpdates().subscribe(data => {
      this.getRoundInfo();
    });

    this.currentUser = new User();
    this.currentUser.id = this.auth.userId;
    this.currentUser.firstName = this.auth.firstName;
    this.currentUser.lastName = this.auth.lastName;
  }

  ngOnInit() {
    this.path = [
      {'title': 'Game Tables', 'link': '/game-tables'},
      {'title': 'Game Table', 'link': '/game-table/' + this.gameTableId},
      {'title': 'Game Round', 'active': true}
    ];
    this.gameRoundsService.startGame(this.gameTableId).subscribe(data => {
      this.message = data.message;
      if (data.roundState === 'Exists') {
        this.getRoundInfo();
      }
    });
  }

  getRoundInfo() {
    this.gameRoundsService.getRoundInfo(this.gameTableId).subscribe(data => {
      this.gameInfo = data;
      this.playerCount = Object.keys(this.gameInfo.players).length;
      for (let i = 0; i < this.playerCount; i++) {
        const index = this.gameInfo.players[i].position - 1;
        this.players[index] = this.gameInfo.players[i];
        if (this.gameInfo.players[i].user_id === this.currentUser.id) {
          this.currentUserPosition = this.gameInfo.players[i].position;
        }
      }

      this.otherPlayers = this.players.slice(this.currentUserPosition, this.playerCount)
        .concat(this.players.slice(0, this.currentUserPosition - 1));

      this.openCard = this.gameInfo.open_deck.slice(-1).pop();
    });
  }

  selectCard(card, event) {
    const index = this.selectedCards.indexOf(card);
    if (event.target.className !== 'selected-card') {
      this.selectedCards.push(card);
      event.target.className = 'selected-card';
    } else {
      event.target.className = '';
      this.selectedCards.splice(index, 1);
    }
  }

  pickOpenCard() {

  }

  pickClosedCard() {

  }

  ngOnDestroy() {
    console.log('table rounds destroyed');
    this.connection.unsubscribe();
  }
}
