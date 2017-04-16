import { TestBed, inject } from '@angular/core/testing';

import { TableUsersService } from './table-users.service';

describe('TableUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableUsersService]
    });
  });

  it('should ...', inject([TableUsersService], (service: TableUsersService) => {
    expect(service).toBeTruthy();
  }));
});
