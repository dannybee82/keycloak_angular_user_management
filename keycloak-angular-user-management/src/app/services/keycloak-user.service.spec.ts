import { TestBed } from '@angular/core/testing';
import { KeycloakUserService } from './keycloak-user.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('KeycloakUserService', () => {
  let service: KeycloakUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
