import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdcComponent } from './ldc.component';

describe('LdcComponent', () => {
  let component: LdcComponent;
  let fixture: ComponentFixture<LdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
