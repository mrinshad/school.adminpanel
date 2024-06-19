import { Role } from './role.model';

export interface ApiResult {
    error?: string;
}

export interface AuthResult extends ApiResult {
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface CreateTenantRequest {
    name: string;
}

export interface CreateRoleRequest {
    name: string;
    belongsTo: string;
    isDefault: boolean;
}

export interface GetRolesResponse {
    roles: Role[];
}

export interface AssignRolesRequest {
    permissions: string[];
}

export interface GetAllPermissionsResponse {
    permission: string[];
}

export interface GetUserTypesResponse {
    types: string[];
}