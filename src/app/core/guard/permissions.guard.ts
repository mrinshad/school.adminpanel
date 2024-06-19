import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@shared';

@Injectable({
    providedIn: 'root',
})
export class PermissionGuard {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state: RouterStateSnapshot,
    ): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.authService.isAuthenticatedUser()) {
                if (
                    route.data.permissions &&
                    this.authService.checkPermissions(route.data.permissions)
                ) {
                    resolve(true);
                } else {
                    this.router.navigate(['/signin']);
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    }
}
