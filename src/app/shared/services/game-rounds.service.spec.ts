import { TestBed, inject } from '@angular/core/testing';

import { GameRoundsService } from './game-rounds.service';

describe('GameRoundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameRoundsService]
    });
  });

  it('should ...', inject([GameRoundsService], (service: GameRoundsService) => {
    expect(service).toBeTruthy();
  }));
});
