import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRole: string[] = route.data['roles'];

  if (!requiredRole) {
    return false;
  }

  const hasRequiredRole = (roles: string[]): boolean => {
    return grantedRoles.realmRoles.some((grantedRole) => roles.includes(grantedRole));
  }

  if (authenticated && hasRequiredRole(requiredRole)) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);