import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenantDialogComponent } from './add-tenant-dialog.component';

describe('AddTenantDialogComponent', () => {
    let component: AddTenantDialogComponent;
    let fixture: ComponentFixture<AddTenantDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddTenantDialogComponent],
        });
        fixture = TestBed.createComponent(AddTenantDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
