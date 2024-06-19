export interface Role {
    id: number;
    name: string;
    tenantID: number;
    permissions?: string[];
}
