import { TestBed } from '@angular/core/testing';
import { KeycloakUser } from './keycloak-user';
import { beforeEach, describe, expect, it } from 'vitest';

describe('KeycloakUserService', () => {
  let service: KeycloakUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
