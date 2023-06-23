import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArpComponent } from './arp.component';

describe('ArpComponent', () => {
  let component: ArpComponent;
  let fixture: ComponentFixture<ArpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
