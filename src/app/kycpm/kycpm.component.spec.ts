import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycpmComponent } from './kycpm.component';

describe('KycpmComponent', () => {
  let component: KycpmComponent;
  let fixture: ComponentFixture<KycpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
