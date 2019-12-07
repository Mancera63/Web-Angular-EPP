import { TestBed } from '@angular/core/testing';

import { LoginGuardianService } from './login-guardian.service';

describe('LoginGuardianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginGuardianService = TestBed.get(LoginGuardianService);
    expect(service).toBeTruthy();
  });
});
