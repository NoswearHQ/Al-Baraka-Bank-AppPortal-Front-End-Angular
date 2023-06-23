import { TestBed } from '@angular/core/testing';

import { LDCService } from './ldc.service';

describe('LDCService', () => {
  let service: LDCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LDCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
