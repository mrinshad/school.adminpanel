import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from './dialog-config';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    public constructor(
        private readonly dialogRef: MatDialogRef<unknown>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
}
