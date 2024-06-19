import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantListComponent } from './tenant-list.component';

describe('TenantComponent', () => {
    let component: TenantListComponent;
    let fixture: ComponentFixture<TenantListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TenantListComponent],
        });
        fixture = TestBed.createComponent(TenantListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
