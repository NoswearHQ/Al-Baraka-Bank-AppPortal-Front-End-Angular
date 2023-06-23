import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycppComponent } from './kycpp.component';

describe('KycppComponent', () => {
  let component: KycppComponent;
  let fixture: ComponentFixture<KycppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
