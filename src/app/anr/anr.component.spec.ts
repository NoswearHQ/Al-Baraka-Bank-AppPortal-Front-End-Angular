import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnrComponent } from './anr.component';

describe('AnrComponent', () => {
  let component: AnrComponent;
  let fixture: ComponentFixture<AnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
