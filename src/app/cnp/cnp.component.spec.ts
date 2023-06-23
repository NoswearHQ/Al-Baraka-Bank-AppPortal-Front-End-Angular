import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpComponent } from './cnp.component';

describe('CnpComponent', () => {
  let component: CnpComponent;
  let fixture: ComponentFixture<CnpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
