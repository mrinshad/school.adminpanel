import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    DialogData,
    generalDialogConfig,
} from '@ui-commons/dialog/dialog-config';

export interface TenantDialogData {
    name: string;
}

@Component({
    selector: 'app-add-tenant-dialog',
    templateUrl: './add-tenant-dialog.component.html',
    styleUrls: ['./add-tenant-dialog.component.scss'],
})
export class AddTenantDialogComponent {
    public formControl = new FormControl('', Validators.required);

    constructor(
        public dialogRef: MatDialogRef<typeof self, string>,
        @Inject(MAT_DIALOG_DATA) public data: TenantDialogData,
    ) {
        this.data = { ...generalDialogConfig.data, ...data } as DialogData &
            TenantDialogData;
    }

    public create(): void {
        this.dialogRef.close(this.formControl.value!);
    }
}
