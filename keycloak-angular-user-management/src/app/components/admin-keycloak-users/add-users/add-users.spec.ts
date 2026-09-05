import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUsers } from './add-users';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AddUsersComponent', () => {
  let component: AddUsers;
  let fixture: ComponentFixture<AddUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
