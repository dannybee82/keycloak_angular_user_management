import { Routes } from '@angular/router';
import { ApplicationRoles } from './models/application-roles.enum';
import { canActivateAuthRole } from './guards/route.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/login/login').then(c => c.Login)
    },
    {
        path: 'admin',
        loadComponent: () => import('./components/admin-keycloak-users/admin-keycloak-users').then(c => c.AdminKeycloakUsers),
        canActivate: [canActivateAuthRole],
        data: { roles:[ApplicationRoles.ADMIN] }
    },
    {
        path: 'add-user',
        loadComponent: () => import('./components/admin-keycloak-users/add-users/add-users').then(c => c.AddUsers),
        canActivate: [canActivateAuthRole],
        data: { roles:[ApplicationRoles.ADMIN] }
    }
];