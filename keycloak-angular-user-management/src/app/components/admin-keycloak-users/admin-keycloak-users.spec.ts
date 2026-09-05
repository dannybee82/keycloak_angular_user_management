import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminKeycloakUsers } from './admin-keycloak-users';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AdminKeycloakUsersComponent', () => {
  let component: AdminKeycloakUsers;
  let fixture: ComponentFixture<AdminKeycloakUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKeycloakUsers]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminKeycloakUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});