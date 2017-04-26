import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
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
  cardPosition: number;
  pickedCard: string;
  closedCard: string;
  playerDeck = [];
  cardPicked = 'card-picked';
  cardClosed = 'card-closed';

  constructor(private auth: AuthenticationService,
              private gameRoundsService: GameRoundsService,
              private socket: SocketService,
              private route: ActivatedRoute,
              private elRef: ElementRef) {
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

  renderTable() {
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

    if (this.gameInfo.card_picked_from === 'Open') {
      this.openCard = this.cardPicked;
    } else {
      this.openCard = this.gameInfo.open_card;
    }

    if (this.gameInfo.card_picked_from === 'Closed') {
      this.closedCard = this.cardPicked;
    } else {
      this.closedCard = this.cardClosed;
    }
    this.pickedCard = this.gameInfo.picked_card;
    this.cardPosition = this.gameInfo.card_position;

    if (this.playerDeck.length === 0) {
      this.playerDeck = this.gameInfo.player_deck;
    } else if (this.gameInfo.card_picked_from === 'Closed' || this.gameInfo.card_picked_from === 'Open') {
      this.playerDeck.push(this.pickedCard);
    }
  }

  getRoundInfo() {
    this.gameRoundsService.getRoundInfo(this.gameTableId).subscribe(data => {
      this.gameInfo = data;
      this.renderTable();
    });
  }

  selectCard(card, id) {
    const index = this.selectedCards.indexOf(card);
    if (this.elRef.nativeElement.querySelector('#card-' + id).classList.contains('selected-card')) {
      this.selectedCards.splice(index, 1);
      this.elRef.nativeElement.querySelector('#card-' + id).classList.remove('selected-card');
    } else {
      this.selectedCards.push(card);
      this.elRef.nativeElement.querySelector('#card-' + id).classList.add('selected-card');
    }
  }

  pickOpenCard() {
    if (this.cardPosition === this.currentUser.id) {
      if (!this.pickedCard) {
        this.gameRoundsService.pickOpenCard(this.gameTableId).subscribe(data => {
          this.gameInfo = data;
          this.renderTable();
        });
      } else {
        this.message = 'You already picked a card.';
      }
    } else {
      this.message = 'Wait for your chance.';
    }
  }

  pickClosedCard() {
    if (this.cardPosition === this.currentUser.id) {
      if (!this.pickedCard) {
        this.gameRoundsService.pickClosedCard(this.gameTableId).subscribe(data => {
          this.gameInfo = data;
          this.renderTable();
        });
      } else {
        this.message = 'You already picked a card.';
      }
    } else {
      this.message = 'Wait for your chance.';
    }
  }

  dropCard() {
    if (this.cardPosition === this.currentUser.id) {
      if (this.pickedCard) {
        if (this.selectedCards.length === 1) {
          this.gameRoundsService.dropCard(this.gameTableId, this.selectedCards[0]).subscribe(data => {
            this.gameInfo = data;
            const index = this.playerDeck.indexOf(this.selectedCards[0]);
            if (index > -1) {
              this.playerDeck.splice(index, 1);
              this.selectedCards = [];
            }
            this.renderTable();
          });
        } else {
          this.message = 'You must select one card to drop.';
        }
      } else {
        this.message = 'You have to pick a card before you drop.';
      }
    } else {
      this.message = 'Wait for your chance.';
    }
  }

  rummy() {

  }

  ngOnDestroy() {
    console.log('table rounds destroyed');
    this.connection.unsubscribe();
  }
}
