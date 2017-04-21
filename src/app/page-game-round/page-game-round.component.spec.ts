import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameRoundComponent } from './page-game-round.component';

describe('PageGameRoundComponent', () => {
  let component: PageGameRoundComponent;
  let fixture: ComponentFixture<PageGameRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGameRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGameRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
