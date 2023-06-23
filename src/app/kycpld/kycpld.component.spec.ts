import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycpldComponent } from './kycpld.component';

describe('KycpldComponent', () => {
  let component: KycpldComponent;
  let fixture: ComponentFixture<KycpldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycpldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycpldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
