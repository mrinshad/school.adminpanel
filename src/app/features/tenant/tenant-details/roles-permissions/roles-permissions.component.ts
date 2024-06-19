import {
    Component,
    Input,
    OnChanges,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MatSelectionList,
    MatSelectionListChange,
} from '@angular/material/list';
import { Role } from '@shared/models/role.model';
import { ApiService } from '@shared/services/api.service';
import {
    Subject,
    debounceTime,
    distinctUntilChanged,
    takeUntil,
    map,
} from 'rxjs';

@Component({
    selector: 'app-roles-permissions',
    templateUrl: './roles-permissions.component.html',
    styleUrls: ['./roles-permissions.component.scss'],
})
export class RolesPermissionsComponent implements OnChanges, OnDestroy, OnInit {
    @Input() roles!: Role[];
    selected!: Role;
    allPermissions: string[] = [];
    filteredPermissions: string[] = [];
    searchInput: FormControl = new FormControl('');
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly changeDetection: ChangeDetectorRef,
        private readonly apiService: ApiService,
    ) {
        this.apiService
            .getAllPermissions()
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                const sortedPerm = response.permission.sort();
                this.allPermissions = sortedPerm;
                this.filteredPermissions = sortedPerm;
            });
    }

    ngOnInit() {
        this.searchInput.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                map((term) => this.getSearchData(term)),
            )
            .subscribe((result) => {
                this.filteredPermissions = result as string[];
            });
    }

    getSearchData(str: string): string[] {
        return this.allPermissions.filter((item) => item.includes(str));
    }

    @ViewChild('permissionList') selectionList!: MatSelectionList;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.roles && changes.roles.currentValue) {
            if (this.roles.length > 0) {
                this.selected = this.roles[0];
            }
            this.changeDetection.detectChanges();

            if (this.selectionList) {
                this.setSelected();
            }
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onSelectionChange(event: MatSelectionListChange): void {
        this.selected = event.source.selectedOptions.selected[0].value;
        this.setSelected();
    }

    save() {
        this.selected.permissions =
            this.selectionList.selectedOptions.selected.map(
                (option) => option.value,
            );
        this.apiService
            .assignRoles(
                {
                    permissions: this.selected.permissions,
                },
                this.selected.id,
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                // TODO: add snackbar
            });
    }

    setSelected() {
        this.selectionList?.deselectAll();
        this.selectionList?.options.forEach((opt) => {
            if (this.selected.permissions?.includes(opt.value)) {
                opt.selected = true;
            }
        });
        this.changeDetection.detectChanges();
    }
}
