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
import { MasterBrands, MasterBrandService, Representative } from '../service/master-brand.service';
import { Product, ProductService } from '../service/product.service';
import {ObjectUtils} from "primeng/utils";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddBrandDialogComponent } from './modal/add-brand.component';
import { DetailBrandDialogComponent } from './modal/detail-brand.component';


interface expandedRows {
    [key: string]: boolean;
}

interface Country {
    name: string;
    code: string;
}


@Component({
    selector: 'app-master-brand',
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
        IconFieldModule,
        DynamicDialogModule
    ],
    templateUrl: 'views/index-master-brand.html',
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, MasterBrandService, ProductService, DialogService]
})
export class MasterBrand implements OnInit {
    brands: MasterBrands[] = [];

    selectedBrands: MasterBrands[] = [];

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
        private masterBrandService: MasterBrandService,
        private productService: ProductService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadBrands();
        // this.customerService.getCustomersLarge().then((customers) => {
        //     this.customers1 = customers;
        //     this.loading = false;

        //     // @ts-ignore
        //     this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
        // });
        // this.customerService.getCustomersMedium().then((customers) => (this.customers2 = customers));
        // this.customerService.getCustomersLarge().then((customers) => (this.customers3 = customers));
        // this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));

        // this.representatives = [
        //     { name: 'Amy Elsner', image: 'amyelsner.png' },
        //     { name: 'Anna Fali', image: 'annafali.png' },
        //     { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        //     { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        //     { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        //     { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        //     { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        //     { name: 'Onyama Limba', image: 'onyamalimba.png' },
        //     { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        //     { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        // ];

        // this.statuses = [
        //     { label: 'Unqualified', value: 'unqualified' },
        //     { label: 'Qualified', value: 'qualified' },
        //     { label: 'New', value: 'new' },
        //     { label: 'Negotiation', value: 'negotiation' },
        //     { label: 'Renewal', value: 'renewal' },
        //     { label: 'Proposal', value: 'proposal' }
        // ];

        // this.countries = [
        //     { name: 'Australia', code: 'AU' },
        //     { name: 'Brazil', code: 'BR' },
        //     { name: 'China', code: 'CN' },
        //     { name: 'Egypt', code: 'EG' },
        //     { name: 'France', code: 'FR' },
        //     { name: 'Germany', code: 'DE' },
        //     { name: 'India', code: 'IN' },
        //     { name: 'Japan', code: 'JP' },
        //     { name: 'Spain', code: 'ES' },
        //     { name: 'United States', code: 'US' }
        // ];
    }

    loadBrands() {
        this.loading = true;
        this.masterBrandService.getMasterBrand().subscribe({
            next: (res) => {
                this.brands = res;
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data loaded successfully'
                });
            },
            error: (error) => {
                console.error('Error loading data:', error);
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

        if (this.brands) {
            for (let i = 0; i < this.brands.length; i++) {
                const rowData = this.brands[i];
                const representativeName = rowData?.representative?.id_brand_emp || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.brands[i - 1];
                    const previousRowGroup = previousRowData?.representative?.id_brand_emp;
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

    calculateCustomerTotal(id_brand_emp: string) {
        let total = 0;

        if (this.brands) {
            for (let customer of this.brands) {
                if (customer.representative?.id_brand_emp === id_brand_emp) {
                    total++;
                }
            }
        }

        return total;
    }

    openAddDialog() {
        this.ref = this.dialogService.open(AddBrandDialogComponent, {
            header: 'Tambah Master Brand',
            width: '50%',
            focusTrap: true
        });

        this.ref.onClose.subscribe((newData) => {
            if (newData) {
            this.brands.push({
                md: newData.md,
                id_brand_emp: newData.id_brand_emp,
                representative: { id_brand_emp: 'Unknown', md: 'Unknown' }
            });
            }
        });
    }

    openEditDialog(brand: MasterBrands) {
        this.ref = this.dialogService.open(AddBrandDialogComponent, {
            header: 'Edit Master Brand',
            width: '50%',
            data: {brand: brand}
        });
    }

    openDetailDialog(brand: MasterBrands) {
        this.ref = this.dialogService.open(DetailBrandDialogComponent, {
            header: 'Detail Master Brand',
            width: '70%',
            closable: true,
            modal: true,
            data: {brand: brand}
        });
    }

}
