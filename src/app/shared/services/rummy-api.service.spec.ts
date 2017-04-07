import { TestBed, inject } from '@angular/core/testing';

import { RummyApiService } from './rummy-api.service';

describe('RummyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RummyApiService]
    });
  });

  it('should ...', inject([RummyApiService], (service: RummyApiService) => {
    expect(service).toBeTruthy();
  }));
});
