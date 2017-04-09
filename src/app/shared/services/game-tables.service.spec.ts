import { TestBed, inject } from '@angular/core/testing';

import { GameTablesService } from './game-tables.service';

describe('GameTablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTablesService]
    });
  });

  it('should ...', inject([GameTablesService], (service: GameTablesService) => {
    expect(service).toBeTruthy();
  }));
});
