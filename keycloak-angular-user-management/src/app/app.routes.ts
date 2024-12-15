import { Routes } from '@angular/router';
import { RouteGuard } from './guards/route.guard';
import { ApplicationRoles } from './models/application-roles.enum';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('../app/components/admin-keycloak-users/admin-keycloak-users.component').then(c => c.AdminKeycloakUsersComponent),
        canActivate: [RouteGuard],
        data: { roles:[ApplicationRoles.ADMIN] }
    },
    {
        path: 'add-user',
        loadComponent: () => import('../app/components/admin-keycloak-users/add-users/add-users.component').then(c => c.AddUsersComponent),
        canActivate: [RouteGuard],
        data: { roles:[ApplicationRoles.ADMIN] }
    }
];
