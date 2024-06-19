import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public constructor(
        private authService: AuthService,
        private readonly router: Router,
    ) {}

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['/signin']);
    }
}
