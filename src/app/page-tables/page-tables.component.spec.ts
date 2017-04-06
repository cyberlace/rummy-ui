import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTablesComponent } from './page-tables.component';

describe('PageTablesComponent', () => {
  let component: PageTablesComponent;
  let fixture: ComponentFixture<PageTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
