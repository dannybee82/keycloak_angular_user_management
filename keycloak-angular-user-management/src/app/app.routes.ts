import { Routes } from '@angular/router';
import { ApplicationRoles } from './models/application-roles.enum';
import { canActivateAuthRole } from './guards/route.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('../app/components/admin-keycloak-users/admin-keycloak-users.component').then(c => c.AdminKeycloakUsersComponent),
        canActivate: [canActivateAuthRole],
        data: { roles:[ApplicationRoles.ADMIN] }
    },
    {
        path: 'add-user',
        loadComponent: () => import('../app/components/admin-keycloak-users/add-users/add-users.component').then(c => c.AddUsersComponent),
        canActivate: [canActivateAuthRole],
        data: { roles:[ApplicationRoles.ADMIN] }
    }
];
