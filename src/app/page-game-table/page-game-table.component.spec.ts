import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameTableComponent } from './page-game-table.component';

describe('PageGameTableComponent', () => {
  let component: PageGameTableComponent;
  let fixture: ComponentFixture<PageGameTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGameTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGameTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
