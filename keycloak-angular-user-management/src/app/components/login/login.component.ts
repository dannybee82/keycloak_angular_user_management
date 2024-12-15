import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ApplicationRoles } from '../../models/application-roles.enum';
import { TokenUpdateService } from '../../services/token-update.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {

  authenticated: WritableSignal<boolean> = signal(false);
  isUser: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  isRegistered: WritableSignal<boolean> = signal(false);

  fullName: WritableSignal<string> = signal('');

  private tokenUpdateService = inject(TokenUpdateService);
  private router = inject(Router);
  private readonly keycloak = inject(KeycloakService);

  ngOnInit(): void {
    if(this.keycloak.isLoggedIn()) {
      this.authenticated.set(this.keycloak.isLoggedIn());
      this.tokenUpdateService.start();

      const roles = this.keycloak.getUserRoles();
      this.isUser.set(roles.includes(ApplicationRoles.USER));
      this.isAdmin.set(roles.includes(ApplicationRoles.ADMIN));
      this.isRegistered.set(roles.includes(ApplicationRoles.REGISTERED));

      if(this.isAdmin()) {
        this.router.navigate(['admin']);
      }

      if(this.isUser() || this.isRegistered()) {
        this.keycloak.loadUserProfile().then((data: KeycloakProfile) => {
          this.fullName.set(`${data.firstName} ${data.lastName}`);
        });
      }
    }
  }

  login() : void {
    this.keycloak.login();
  }

  logout() : void {
    this.tokenUpdateService.stop();
    this.keycloak.logout();
  }

}