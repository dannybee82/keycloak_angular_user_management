import { TestBed } from '@angular/core/testing';

import { TokenUpdateService } from './token-update.service';

describe('TokenUpdateService', () => {
  let service: TokenUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});