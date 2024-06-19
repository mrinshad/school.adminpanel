import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserType } from '@shared';
import { AuthRequest } from '@shared';
import { AuthService } from '@shared';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
    public form!: FormGroup;
    submitted = false;
    loading = false;
    error = '';
    public hide = true;

    private readonly destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    public ngOnInit(): void {
        this.form = new FormGroup({
            username: new FormControl<string>('', [
                Validators.required,
                Validators.min(1),
            ]),
            password: new FormControl<string>('', [
                Validators.required,
            ]),
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onSubmit(): void {
        this.submitted = true;
        this.loading = true;
        this.error = '';
        if (this.form.invalid) {
            this.error = 'Username and Password not valid !';
            return;
        } else {
            const request: AuthRequest = {
                username: this.form.controls.username.value,
                password: this.form.controls.password.value,
            };
            this.authService
                .signIn(request)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (response) => {
                        if (response) {
                            this.router.navigate(['/dashboard']);
                        } else {
                            this.router.navigate(['/signin']);
                        }
                    },
                    (error) => {
                        this.error = error;
                        this.submitted = false;
                        this.loading = false;
                    },
                );
        }
    }
}
