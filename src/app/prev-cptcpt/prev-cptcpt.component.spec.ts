import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevCPTCPTComponent } from './prev-cptcpt.component';

describe('PrevCPTCPTComponent', () => {
  let component: PrevCPTCPTComponent;
  let fixture: ComponentFixture<PrevCPTCPTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevCPTCPTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevCPTCPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
