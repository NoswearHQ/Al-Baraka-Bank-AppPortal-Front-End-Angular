import { TestBed } from '@angular/core/testing';

import { ARPExtService } from './arp-ext.service';

describe('ARPExtService', () => {
  let service: ARPExtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ARPExtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
