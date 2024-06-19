import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantDialogData } from '../../tenant-list/add-tenant-dialog/add-tenant-dialog.component';
import {
    generalDialogConfig,
    DialogData,
} from '@ui-commons/dialog/dialog-config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateRoleRequest } from '@shared/models/api.model';
import { ApiService } from '@shared/services/api.service';
import { Subject, takeUntil } from 'rxjs';

export interface RoleDialogData {
    name: string;
}

@Component({
    selector: 'app-add-role-dialog',
    templateUrl: './add-role-dialog.component.html',
    styleUrls: ['./add-role-dialog.component.scss'],
})
export class AddRoleDialogComponent implements OnInit, OnDestroy {
    belongsToOptions: string[] = [];
    public formGroup = new FormGroup({
        name: new FormControl<string>('', Validators.required),
        belongsTo: new FormControl<string>('', Validators.required),
        isDefault: new FormControl<boolean>(false, Validators.required),
    });

    private readonly destroy$ = new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<typeof self, CreateRoleRequest>,
        @Inject(MAT_DIALOG_DATA) public data: TenantDialogData,
        private readonly apiService: ApiService,
    ) {
        this.data = { ...generalDialogConfig.data, ...data } as DialogData &
            TenantDialogData;
    }

    public create(): void {
        const role: CreateRoleRequest = {
            name: this.formGroup.value.name!,
            isDefault: this.formGroup.value.isDefault!,
            belongsTo: this.formGroup.value.belongsTo!,
        };
        console.log(this.formGroup);

        this.dialogRef.close(role);
    }

    public ngOnInit(): void {
        this.apiService.getUserTypes()
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                this.belongsToOptions = response.types;
            })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
