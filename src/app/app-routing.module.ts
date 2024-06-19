import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/signin/signin.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard, PermissionGuard } from '@core';
import { TenantListComponent } from './features/tenant/tenant-list/tenant-list.component';
import { TenantDetailsComponent } from './features/tenant/tenant-details/tenant-details.component';
import { Permissions } from '@shared/enums/permissions';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
            permissions: [Permissions.AdminMainView],
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'tenant',
                component: TenantListComponent,
            },
            {
                path: 'tenant-details',
                component: TenantDetailsComponent,
                pathMatch: 'prefix',
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: '*',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        component: SigninComponent,
    },
    {
        path: 'signin',
        component: SigninComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
