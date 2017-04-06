import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreateTableComponent } from './page-create-table.component';

describe('PageCreateTableComponent', () => {
  let component: PageCreateTableComponent;
  let fixture: ComponentFixture<PageCreateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCreateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
