import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminKeycloakUsersComponent } from './admin-keycloak-users.component';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AdminKeycloakUsersComponent', () => {
  let component: AdminKeycloakUsersComponent;
  let fixture: ComponentFixture<AdminKeycloakUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKeycloakUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminKeycloakUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});