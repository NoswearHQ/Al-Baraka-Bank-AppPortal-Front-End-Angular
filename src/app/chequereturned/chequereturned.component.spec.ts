import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequereturnedComponent } from './chequereturned.component';

describe('ChequereturnedComponent', () => {
  let component: ChequereturnedComponent;
  let fixture: ComponentFixture<ChequereturnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequereturnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequereturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
