import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Injectable(
    { providedIn: 'root' }
)
export class RouteGuard {

    private router = inject(Router);
    private readonly keycloak = inject(KeycloakService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.keycloak.isLoggedIn()) {
            const roles = this.keycloak.getUserRoles();

            if(route.data['roles'] && !roles.some(item => route.data['roles'].includes(item)) ) {                
                // role not authorized so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorized so return true
            return true;
        } else {
            // not logged in so redirect to login pag
            this.router.navigate(['/']);
            return false;
        }
    }

}