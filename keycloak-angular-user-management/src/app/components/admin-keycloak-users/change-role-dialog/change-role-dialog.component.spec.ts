import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeRoleDialogComponent } from './change-role-dialog.component';
import { beforeEach, describe, expect, it } from 'vitest';

describe('RoleDialogComponent', () => {
  let component: ChangeRoleDialogComponent;
  let fixture: ComponentFixture<ChangeRoleDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRoleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
