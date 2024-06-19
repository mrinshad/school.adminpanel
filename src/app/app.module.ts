import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './features/signin/signin.component';
import { UiCommonsModule } from '@ui-commons/ui-commons.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AddTenantDialogComponent } from './features/tenant/tenant-list/add-tenant-dialog/add-tenant-dialog.component';
import { TenantListComponent } from './features/tenant/tenant-list/tenant-list.component';
import { AuthInterceptorService } from '@core/interceptor/auth.interceptor';
import { TenantDetailsComponent } from './features/tenant/tenant-details/tenant-details.component';
import { AddRoleDialogComponent } from './features/tenant/tenant-details/add-role-dialog/add-role-dialog.component';
import { RolesPermissionsComponent } from './features/tenant/tenant-details/roles-permissions/roles-permissions.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MainLayoutComponent,
        SigninComponent,
        DashboardComponent,
        AddTenantDialogComponent,
        TenantListComponent,
        TenantDetailsComponent,
        AddRoleDialogComponent,
        RolesPermissionsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        UiCommonsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
