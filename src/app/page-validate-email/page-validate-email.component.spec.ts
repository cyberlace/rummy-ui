import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageValidateEmailComponent } from './page-validate-email.component';

describe('PageValidateEmailComponent', () => {
  let component: PageValidateEmailComponent;
  let fixture: ComponentFixture<PageValidateEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageValidateEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageValidateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
