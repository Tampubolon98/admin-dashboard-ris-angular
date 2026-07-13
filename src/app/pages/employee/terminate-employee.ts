import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { MasterEmployees, MasterEmployeeService, Representative } from '../service/master-employee.service';
import { Product, ProductService } from '../service/product.service';
import {ObjectUtils} from "primeng/utils";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddEmployeeDialogComponent } from './modal/add-employee.component';
import { UploadEmployeeDialogComponent } from './modal/upload-employee.component';
import { TerminateEmployeeDialogComponent } from './modal/terminate-employee.component';
// import { DetailEmployeeDialogComponent } from './modal/detail-employee.component';


interface expandedRows {
    [key: string]: boolean;
}

interface Country {
    name: string;
    code: string;
}


@Component({
    selector: 'app-master-employee',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule
    ],
    templateUrl: 'views/index-master-terminate.html',
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, MasterEmployeeService, ProductService, DialogService]
})
export class TerminateEmployee implements OnInit {
    employees: MasterEmployees[] = []

    selectedEmployees: MasterEmployees[] = [];

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    balanceFrozen: boolean = false;

    loading: boolean = true;

    countries: Country[] = [];

    ref: DynamicDialogRef | undefined;

    selectedCountry: Country | undefined;

    itemOptions = [
        {label: 'ALL', value: 'ALL'},
        {label: 'PKL', value: 'PKL'},
        {label: 'SPG', value: 'SPG'}
    ];
    selectedItem: any;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private masterEmployeeService: MasterEmployeeService,
        private productService: ProductService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.loading = true;
        this.masterEmployeeService.getEmployeeTerminate().subscribe({
            next: (res) => {
                this.employees = res;
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data loaded successfully'
                });
            },
            error: (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load data. Please check you API connection.'
                });
            }
        });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.employees) {
            for (let i = 0; i < this.employees.length; i++) {
                const rowData = this.employees[i];
                const representativeName = rowData?.representative?.nama || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.employees[i - 1];
                    const previousRowGroup = previousRowData?.representative?.nama;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    } else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if(ObjectUtils.isEmpty(this.expandedRows)) {
            this.expandedRows = this.products.reduce(
                (acc, p) => {
                    if (p.id) {
                        acc[p.id] = true;
                    }
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            this.isExpanded = true;
        } else {
            this.collapseAll()
        }

    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSeverity(status: string) {
        switch (status) {
            case 'qualified':
            case 'instock':
            case 'INSTOCK':
            case 'DELIVERED':
            case 'delivered':
                return 'success';

            case 'negotiation':
            case 'lowstock':
            case 'LOWSTOCK':
            case 'PENDING':
            case 'pending':
                return 'warn';

            case 'unqualified':
            case 'outofstock':
            case 'OUTOFSTOCK':
            case 'CANCELLED':
            case 'cancelled':
                return 'danger';

            default:
                return 'info';
        }
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.employees) {
            for (let customer of this.employees) {
                if (customer.representative?.nama === name) {
                    total++;
                }
            }
        }

        return total;
    }

    openAddDialog() {
        this.ref = this.dialogService.open(AddEmployeeDialogComponent, {
            header: 'Tambah Data Karyawan',
            width: '50%',
            focusTrap: true
        });

        this.ref.onClose.subscribe((newData) => {
            if (newData) {
            this.employees.push({
                nama: newData.nama,
                representative: { nama: 'Unknown', image_employee: 'default.png' },
            });
            }
        });
    }

    openUploadDialog() {
        this.ref = this.dialogService.open(UploadEmployeeDialogComponent, {
            header: 'Upload File Excel',
            width: '50%',
            closable: true,
            modal: true
        });
    }

    openEditDialog() {
        this.ref = this.dialogService.open(AddEmployeeDialogComponent, {
            header: 'Edit Data Karyawan',
            width: '50%',
        });
    }

    // openDetailDialog() {
    //     this.ref = this.dialogService.open(DetailEmployeeDialogComponent, {
    //         header: 'Detail Data Karyawan',
    //         width: '70%',
    //         closable: true,
    //         modal: true
    //     });
    // }

    openTerminateDialog() {
        this.ref = this.dialogService.open(TerminateEmployeeDialogComponent, {
            header: 'Terminate Data Karyawan',
            width: '50%'
        });
    }

}
