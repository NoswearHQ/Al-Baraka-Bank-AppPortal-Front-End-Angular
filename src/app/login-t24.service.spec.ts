import { TestBed } from '@angular/core/testing';

import { LoginT24Service } from './login-t24.service';

describe('LoginT24Service', () => {
  let service: LoginT24Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginT24Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
