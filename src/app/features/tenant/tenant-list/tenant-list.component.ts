import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import {
    AddTenantDialogComponent,
    TenantDialogData,
} from './add-tenant-dialog/add-tenant-dialog.component';
import { ApiService } from '@shared/services/api.service';
import { Tenant } from '@shared/models/tenant.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tenant-list',
    templateUrl: './tenant-list.component.html',
    styleUrls: ['./tenant-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TenantListComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();
    public tenants: Tenant[] = [];

    public constructor(
        private readonly createTenantDialog: MatDialog,
        private readonly apiService: ApiService,
        private readonly router: Router,
    ) {}

    public ngOnInit(): void {
        this.getTenants();
    }

    public createTenant(): void {
        this.openDialog()
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((tenantName) => {
                if (tenantName) {
                    this.apiService
                        .createTenant({
                            name: tenantName!,
                        })
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.getTenants();
                        });
                }
            });
    }

    public openDialog(): MatDialogRef<AddTenantDialogComponent, string> {
        return this.createTenantDialog.open<
            AddTenantDialogComponent,
            TenantDialogData,
            string
        >(AddTenantDialogComponent, {
            data: {
                name: '',
            },
        });
    }

    public goToDetails(tenant: Tenant) {
        this.router.navigate(['/tenant-details'], {
            queryParams: { data: JSON.stringify(tenant) },
        });
    }

    private getTenants() {
        this.apiService
            .getTenants()
            .pipe(takeUntil(this.destroy$))
            .subscribe((tenants) => {
                this.tenants = tenants;
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
