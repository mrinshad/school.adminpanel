import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AssignRolesRequest,
    CreateRoleRequest,
    CreateTenantRequest,
    GetAllPermissionsResponse,
    GetRolesResponse,
    GetUserTypesResponse,
} from '@shared/models/api.model';
import { Role } from '@shared/models/role.model';
import { Tenant } from '@shared/models/tenant.model';
import { environment } from 'environments/environment';
import { Observable, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private url = environment.apiUrl;

    constructor(private http: HttpClient) {}

    ///////////////////////////////////////////////////////////////////////
    // #region Tenant
    public createTenant(req: CreateTenantRequest): Observable<Tenant> {
        return this.http.post<Tenant>(`${this.url}/admin/tenant`, req);
    }

    public getTenants(): Observable<Tenant[]> {
        return this.http.get<Tenant[]>(`${this.url}/admin/tenant`);
    }

    // #endregion

    ///////////////////////////////////////////////////////////////////////
    // #region Roles & Permissions
    private cachedAllPermissions: GetAllPermissionsResponse =
        {} as GetAllPermissionsResponse;

    public createRole(
        req: CreateRoleRequest,
        tenantID: number,
    ): Observable<Role> {
        return this.http.post<Role>(
            `${this.url}/admin/tenant/${tenantID}/roles`,
            req,
        );
    }

    public getRoles(tenantID: number): Observable<GetRolesResponse> {
        return this.http.get<GetRolesResponse>(
            `${this.url}/admin/tenant/${tenantID}/roles`,
        );
    }

    public assignRoles(
        req: AssignRolesRequest,
        roleID: number,
    ): Observable<void> {
        return this.http.put<void>(
            `${this.url}/admin/roles/${roleID}/assign`,
            req,
        );
    }

    public getAllPermissions(): Observable<GetAllPermissionsResponse> {
        if (this.cachedAllPermissions.permission) {
            return of(this.cachedAllPermissions);
        }
        return this.http
            .get<GetAllPermissionsResponse>(`${this.url}/admin/permissions`)
            .pipe(
                map((res) => {
                    this.cachedAllPermissions = res;
                    return res;
                }),
            );
    }

    public getUserTypes(): Observable<GetUserTypesResponse> {
        return this.http
            .get<GetUserTypesResponse>(`${this.url}/admin/user-types`);
    }

    // #endregion
}
