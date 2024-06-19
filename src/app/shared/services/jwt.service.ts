import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class JWTService {
    public decodeToken(token: string): User {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = JSON.parse(
            decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join(''),
            ),
        );
        jsonPayload['exp'] = new Date(+jsonPayload['exp'] * 1000);
        return jsonPayload as User;
    }
}
