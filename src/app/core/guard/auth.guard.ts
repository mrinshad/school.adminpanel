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
export class AuthGuard {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        route: ActivatedRouteSnapshot,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state: RouterStateSnapshot,
    ): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.authService.isAuthenticatedUser()) {
                resolve(true);
            } else {
                this.router.navigate(['/signin']);
                resolve(false);
            }
        });
    }
}
