import { Component, OnInit, WritableSignal, signal, inject } from "@angular/core";
import { Router } from "@angular/router";
import Keycloak, { KeycloakProfile, KeycloakRoles } from "keycloak-js";
import { ApplicationRoles } from "../../models/application-roles.enum";
import { ToastrService } from 'ngx-toastr';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from "keycloak-angular";

@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  
  protected authenticated: WritableSignal<boolean> = signal(false);
  protected isUser: WritableSignal<boolean> = signal(false);
  protected isAdmin: WritableSignal<boolean> = signal(false);
  protected isRegistered: WritableSignal<boolean> = signal(false);

  protected fullName: WritableSignal<string> = signal('');
  protected router = inject(Router);
  protected toastr = inject(ToastrService);

  ngOnInit(): void {
    this.setKeycloakData();
  }

  setKeycloakData(): void {
     if(this.keycloakSignal().type === KeycloakEventType.Ready) { 
      this.authenticated.set(this.keycloakSignal().args === true ? true : false);       
    } else if(this.keycloakSignal().type === KeycloakEventType.AuthRefreshSuccess) {
      this.authenticated.set(true);    
    }
    
    if(this.authenticated()) {
      const keycloakRoles: KeycloakRoles | undefined = this.keycloak.realmAccess;
      const roles: string[] = keycloakRoles?.roles ?? [];
      
      this.isAdmin.set(roles.includes(ApplicationRoles.ADMIN));
      this.isUser.set(roles.includes(ApplicationRoles.USER));
      this.isRegistered.set(roles.includes(ApplicationRoles.REGISTERED));

      this.keycloak.loadUserProfile().then((data: KeycloakProfile) => {
        let name = '';
        if (data.firstName) {
          name += data.firstName;
          if (data.lastName) {
            name += " " + data.lastName;
          }
        }
        this.fullName.set(name);
      });
    } else {
      this.router.navigate(['']);
    } 
  }

  login() : void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

}