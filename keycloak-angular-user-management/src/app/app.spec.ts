import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'keycloak-angular-user-management' title`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    //@ts-ignore
    expect(app.title).toEqual('keycloak-angular-user-management');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, keycloak-angular-user-management');
  });
});
