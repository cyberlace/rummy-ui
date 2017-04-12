import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-game-table',
  templateUrl: './page-game-table.component.html',
  styleUrls: ['./page-game-table.component.scss']
})
export class PageGameTableComponent implements OnInit {
  private path: Object;

  constructor() { }

  ngOnInit() {
    this.path = [
      {'title': 'Game Tables', 'link': '/game-tables'},
      {'title': 'Game Table', 'active': true}
    ];

  }

}
