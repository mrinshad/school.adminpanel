import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tenant } from '@shared/models/tenant.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    AddRoleDialogComponent,
    RoleDialogData,
} from './add-role-dialog/add-role-dialog.component';
import { ApiService } from '@shared/services/api.service';
import { Role } from '@shared/models/role.model';
import { CreateRoleRequest } from '@shared/models/api.model';

@Component({
    selector: 'app-tenant-details',
    templateUrl: './tenant-details.component.html',
    styleUrls: ['./tenant-details.component.scss'],
})
export class TenantDetailsComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();
    tenant!: Tenant;
    roles: Role[] = [];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly dialog: MatDialog,
        private readonly apiService: ApiService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                if (params.data) {
                    this.tenant = JSON.parse(params.data);
                    this.getRoles();
                }
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getRoles() {
        this.apiService
            .getRoles(this.tenant.ID)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                this.roles = response.roles;
            });
    }

    public createRole() {
        this.openDialog()
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((role) => {
                if (role) {
                    this.apiService
                        .createRole(role, this.tenant.ID)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.getRoles();
                        });
                }
            });
    }

    public openDialog(): MatDialogRef<
        AddRoleDialogComponent,
        CreateRoleRequest
    > {
        return this.dialog.open<
            AddRoleDialogComponent,
            RoleDialogData,
            CreateRoleRequest
        >(AddRoleDialogComponent, {
            data: {
                name: '',
            },
        });
    }
}
