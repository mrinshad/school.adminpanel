import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { DialogComponent } from './dialog/dialog.component';
import { CardComponent } from './card/card.component';

@NgModule({
    declarations: [DialogComponent, CardComponent],
    imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
    exports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DialogComponent,
        CardComponent,
    ],
})
export class UiCommonsModule {}
