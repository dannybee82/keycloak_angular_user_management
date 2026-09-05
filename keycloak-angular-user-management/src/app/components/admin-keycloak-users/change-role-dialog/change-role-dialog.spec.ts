import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeRoleDialog } from './change-role-dialog';
import { beforeEach, describe, expect, it } from 'vitest';

describe('RoleDialogComponent', () => {
  let component: ChangeRoleDialog;
  let fixture: ComponentFixture<ChangeRoleDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRoleDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRoleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
