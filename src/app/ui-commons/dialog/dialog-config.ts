import { MatDialogConfig } from '@angular/material/dialog';

interface DialogData {
    hasXButton: boolean;
}

type DialogConfig = MatDialogConfig & {
    data: DialogData;
};

const generalDialogConfig: DialogConfig = {
    data: {
        hasXButton: false,
    },
};

export type { DialogConfig, DialogData };
export { generalDialogConfig };
