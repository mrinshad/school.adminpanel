import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '@shared';
import { UiCommonsModule } from '@ui-commons/ui-commons.module';

@NgModule({
    declarations: [HeaderComponent, MainLayoutComponent],
    imports: [CommonModule, SharedModule, UiCommonsModule],
})
export class LayoutModule {}
