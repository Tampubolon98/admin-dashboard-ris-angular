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
import { Customer, CustomerService, Representative } from '../service/customer.service';
import { Product, ProductService } from '../service/product.service';
import {ObjectUtils} from "primeng/utils";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddEmployeeDialogComponent } from './modal/add-employee.component';
import { UploadEmployeeDialogComponent } from './modal/upload-employee.component';
import { TerminateEmployeeDialogComponent } from './modal/terminate-employee.component';
import { DetailEmployeeDialogComponent } from './modal/detail-employee.component';


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
    template: ` <div class="card">
            <div class="font-semibold text-xl mb-4">Report Karyawan</div>
            <div class="flex justify-between items-center flex-column sm:flex-row">
                <div class="mb-4">
                    <div class="flex flex-col md:flex-row gap-6 mb-4">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="kodetoko">Kode Toko :</label>
                            <p-select 
                                [options]="storeCodeOptions"
                                [(ngModel)]="selectedStoreCode"
                                optionLabel="label"
                                [showClear]="true"
                                placeholder="Pilih Kode Toko"
                                class="w-165"
                            >
                            </p-select>
                        </div>
                    
                        <div class="flex flex-col gap-2 w-full">
                            <label for="kategorikaryawan">Kategori Karyawan :</label>
                            <p-select 
                                [options]="categoryOptions"
                                [(ngModel)]="selectedCategory"
                                optionLabel="label"
                                [showClear]="true"
                                placeholder="Pilih Kategori Karyawan"
                                class="w-165"
                            >
                            </p-select>
                        </div>
                    </div>

                    <p-button label="Export PDF" severity="danger" class="mr-2" icon="pi pi-file-pdf" (onClick)="openAddDialog()"></p-button>

                    <p-button label="Export XLS" severity="success" class="mr-2" icon="pi pi-file-excel" (onClick)="openAddDialog()"></p-button>
                </div>
            </div>
        </div>`,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService, ProductService, DialogService]
})
export class ReportEmployee implements OnInit {
    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    balanceFrozen: boolean = false;

    loading: boolean = true;

    selectedCategory: any;

    selectedStoreCode: any;

    countries: Country[] = [];

    ref: DynamicDialogRef | undefined;

    selectedCountry: Country | undefined;

    categoryOptions = [
        {label: 'ALL', value: 'ALL'},
        {label: 'PKL', value: 'PKL'},
        {label: 'SPG', value: 'SPG'}
    ];

    storeCodeOptions = [
        {label: 'RHO', value: 'RHO'},
        {label: 'R125', value: 'R125'}
    ];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        public dialogService: DialogService
    ) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
        });
        this.customerService.getCustomersMedium().then((customers) => (this.customers2 = customers));
        this.customerService.getCustomersLarge().then((customers) => (this.customers3 = customers));
        this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
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

        if (this.customers2) {
            for (let customer of this.customers2) {
                if (customer.representative?.name === name) {
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
            this.customers1.push({
                id: newData.id,
                name: newData.name,
                country: { name: 'Unknown', code: 'XX' },
                representative: { name: 'Unknown', image: 'default.png' },
                date: new Date().toISOString(),
                balance: 0,
                status: 'new'
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

    openDetailDialog() {
        this.ref = this.dialogService.open(DetailEmployeeDialogComponent, {
            header: 'Detail Data Karyawan',
            width: '70%',
            closable: true,
            modal: true
        });
    }

    openTerminateDialog() {
        this.ref = this.dialogService.open(TerminateEmployeeDialogComponent, {
            header: 'Terminate Data Karyawan',
            width: '50%'
        });
    }

}
