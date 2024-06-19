import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthRequest, AuthResult } from '../models/api.model';
import { JWTService } from './jwt.service';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private url = environment.apiUrl;
    public token: string = '';
    public currentUserSubject = new BehaviorSubject<User>(<User>{});
    public currentUser = this.currentUserSubject.asObservable();

    public userData: User = {} as User;

    private readonly destroy$ = new Subject<void>();

    constructor(
        private http: HttpClient,
        private readonly jwtService: JWTService,
    ) { }

    public get currentUserValue(): User {
        return this.currentUserSubject.value ?? ({} as User);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public signIn(reqParam: AuthRequest): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.http
            .post<AuthResult>(`${this.url}/admin-user/login`, reqParam)
            .pipe(
                tap((response) => {
                    this.setToken(response.accessToken);
                }),
            );
    }

    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem('accessToken', token);
        // TODO: remove
        this.currentUserSubject.next(this.jwtService.decodeToken(token));
    }

    public getToken(): string {
        return localStorage.getItem('accessToken')!;
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
        this.currentUserSubject.next({} as User);
        return of({ success: false });
    }

    public isAuthenticatedUser(): boolean {
        if (this.currentUserValue && this.currentUserValue.exp) {
            return new Date() < this.currentUserValue.exp!;
        }

        const token = localStorage.getItem('accessToken');
        if (!token || token === '') {
            return false;
        } else {
            const userData = this.jwtService.decodeToken(token!);
            this.currentUserSubject.next(userData);
            return new Date() < userData.exp!;
        }
    }

    public checkPermissions(requiredPermissions: string[]) {
        const existingPermissions: string[] =
            this.currentUserValue?.permissions || [];
        return requiredPermissions.every((element) =>
            existingPermissions.includes(element),
        );
    }
}
