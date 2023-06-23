import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycassComponent } from './kycass.component';

describe('KycassComponent', () => {
  let component: KycassComponent;
  let fixture: ComponentFixture<KycassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
