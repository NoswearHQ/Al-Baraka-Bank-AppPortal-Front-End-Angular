import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreveComponent } from './preve.component';

describe('PreveComponent', () => {
  let component: PreveComponent;
  let fixture: ComponentFixture<PreveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
