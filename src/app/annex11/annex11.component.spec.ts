import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Annex11Component } from './annex11.component';

describe('Annex11Component', () => {
  let component: Annex11Component;
  let fixture: ComponentFixture<Annex11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Annex11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Annex11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
