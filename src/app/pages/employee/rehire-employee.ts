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
import { ObjectUtils } from "primeng/utils";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';

interface expandedRows {
    [key: string]: boolean;
}

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'app-rehire-employee',
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
        DatePickerModule,
        SelectModule,
        TextareaModule
    ],
    template: `
    <div class="card">
        <div class="font-semibold text-xl mb-4">Rehire Karyawan</div>
        
        <div class="card flex flex-col gap-6 w-full p-4">
            <div class="flex flex-col gap-2 w-full">
                <label for="employeeId" class="font-medium">Masukkan Nomor KTP</label>
                <input pInputText id="employeeId" type="text" class="w-full" [(ngModel)]="employeeId" />
            </div>

            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex flex-col gap-2 w-full">
                    <label for="fullname" class="font-medium">Nama Karyawan</label>
                    <input pInputText id="fullname" type="text" class="w-full" [(ngModel)]="employeeName" />
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label for="date_birth" class="font-medium">Tanggal Lahir</label>
                    <p-datepicker 
                        [(ngModel)]="tanggalMasuk" 
                        [showIcon]="true" 
                        inputId="date_birth"
                        [showOnFocus]="false"
                        class="w-full">
                    </p-datepicker>
                </div>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="kategorikaryawan" class="font-medium">Kategori Karyawan</label>
                <p-select 
                    [options]="categoryOptions"
                    [(ngModel)]="selectedCategory"
                    optionLabel="label"
                    [showClear]="true"
                    placeholder="Pilih Kategori Karyawan"
                    class="w-full"
                    inputId="kategorikaryawan">
                </p-select>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="alamat">Alamat</label>
                <textarea pTextarea id="alamat" rows="4" style="border: 1px solid #E3E3E3; border-radius: 10px;"></textarea>
            </div>

            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex flex-col gap-2 w-full">
                    <label for="kodetoko" class="font-medium">Kode Toko</label>
                    <p-select 
                        [options]="storeCodes"
                        [(ngModel)]="selectedStore"
                        optionLabel="name"
                        [filter]="true"
                        filterBy="name"
                        [showClear]="true"
                        placeholder="Pilih Kode Toko"
                        class="w-full"
                        inputId="kodetoko">
                        <ng-template pTemplate="selectedItem" let-selectedOption>
                            <div class="flex items-center gap-2">
                                <div>{{ selectedOption.name }}</div>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="item" let-store>
                            <div class="flex items-center gap-2">
                                <div>{{ store.name }}</div>
                            </div>
                        </ng-template>
                    </p-select>
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label for="perusahaan" class="font-medium">Perusahaan</label>
                    <p-select 
                        [options]="companies"
                        [(ngModel)]="selectedCompany"
                        optionLabel="name"
                        [filter]="true"
                        filterBy="name"
                        [showClear]="true"
                        placeholder="Pilih Perusahaan"
                        class="w-full"
                        inputId="perusahaan">
                        <ng-template pTemplate="selectedItem" let-selectedOption>
                            <div class="flex items-center gap-2">
                                <div>{{ selectedOption.name }}</div>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="item" let-company>
                            <div class="flex items-center gap-2">
                                <div>{{ company.name }}</div>
                            </div>
                        </ng-template>
                    </p-select>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex flex-col gap-2 w-full">
                    <label for="kk" class="font-medium">Nomor Kartu Keluarga</label>
                    <input pInputText id="kk" type="text" class="w-full" [(ngModel)]="noKK" />
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label for="noktp" class="font-medium">Nomor KTP</label>
                    <input pInputText id="noktp" type="text" class="w-full" [(ngModel)]="noKTP" />
                </div>
            </div>

            <!-- Tambahkan field lainnya -->
            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex flex-col gap-2 w-full">
                    <label for="gender" class="font-medium">Jenis Kelamin</label>
                    <p-select 
                        [options]="genderOptions"
                        [(ngModel)]="selectedGender"
                        optionLabel="name"
                        [showClear]="true"
                        placeholder="Pilih Jenis Kelamin"
                        class="w-full"
                        inputId="gender">
                    </p-select>
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label for="status" class="font-medium">Status</label>
                    <p-select 
                        [options]="statusOptions"
                        [(ngModel)]="selectedStatus"
                        optionLabel="name"
                        [showClear]="true"
                        placeholder="Pilih Status"
                        class="w-full"
                        inputId="status">
                    </p-select>
                </div>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="alamat" class="font-medium">Catatan Kerja Karyawan</label>
                <textarea 
                    pInputTextarea 
                    id="alamat" 
                    [(ngModel)]="alamat" 
                    rows="3" 
                    class="w-full">
                </textarea>
            </div>

            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex flex-col gap-2 w-full">
                    <label for="kk" class="font-medium">No Handphone</label>
                    <input pInputText id="kk" type="text" class="w-full" [(ngModel)]="noKK" />
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label for="noktp" class="font-medium">Tanggal Masuk</label>
                    <p-datepicker 
                        [(ngModel)]="tanggalMasuk" 
                        [showIcon]="true" 
                        inputId="date_birth"
                        [showOnFocus]="false"
                        class="w-full">
                    </p-datepicker>
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-3">
                <button pButton 
                    type="button" 
                    label="Simpan" 
                    icon="pi pi-save" 
                    class="p-button-success" 
                    (click)="save()">
                </button>
            </div>
        </div>
    </div>`,
    styles: [
        `
        .card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            padding: 2rem;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
        
        label {
            color: var(--text-color);
        }
        
        .p-inputtext, .p-dropdown, .p-calendar {
            width: 100%;
        }
        
        .p-button {
            min-width: 120px;
        }
        `
    ],
    providers: [ConfirmationService, MessageService, CustomerService, ProductService, DialogService]
})
export class RehireEmployee implements OnInit {
    // Data untuk form rehire
    employeeId: string = '';
    employeeName: string = '';
    tanggalMasuk: Date = new Date();
    selectedCategory: any;
    selectedStore: any;
    selectedCompany: any;
    selectedStatus: any;
    selectedGender: any;
    noKK: string = '';
    noKTP: string = '';
    position: string = '';
    alamat: string = '';
    keterangan: string = '';
    
    // Data untuk select options
    categoryOptions = [
        { label: 'ALL', value: 'ALL' },
        { label: 'PKL', value: 'PKL' },
        { label: 'SPG', value: 'SPG' }
    ];

    genderOptions = [
        { name: 'Laki-Laki', value: 'Laki-Laki' },
        { name: 'Perempuan', value: 'Perempuan' }
    ];
    
    storeCodes = [
        { name: 'Toko Jakarta - JKT001', code: 'JKT001' },
        { name: 'Toko Bandung - BDG002', code: 'BDG002' },
        { name: 'Toko Surabaya - SBY003', code: 'SBY003' },
        { name: 'Toko Medan - MDN004', code: 'MDN004' },
        { name: 'Toko Makassar - MKS005', code: 'MKS005' }
    ];
    
    companies = [
        { name: 'PT Perusahaan A', code: 'PA' },
        { name: 'PT Perusahaan B', code: 'PB' },
        { name: 'PT Perusahaan C', code: 'PC' },
        { name: 'PT Perusahaan D', code: 'PD' }
    ];
    
    statusOptions = [
        { name: 'Belum Menikah', code: 'Belum Menikah' },
        { name: 'Menikah', code: 'Menikah' },
        { name: 'Janda', code: 'Janda' },
        { name: 'Duda', code: 'Duda' }
    ];
    
    // Data yang sudah ada dari kode sebelumnya
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
    countries: Country[] = [];
    ref: DynamicDialogRef | undefined;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        // Inisialisasi data
        this.loadCustomers();
        this.initializeData();
    }

    loadCustomers() {
        this.loading = true;
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;
        });
        
        this.customerService.getCustomersMedium().then((customers) => {
            this.customers2 = customers;
        });
        
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers3 = customers;
            this.updateRowGroupMetaData();
        });
        
        this.productService.getProductsWithOrdersSmall().then((data) => {
            this.products = data;
        });
    }

    initializeData() {
        // Initialize representatives
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

        // Initialize statuses
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

        // Initialize countries (untuk referensi saja)
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

    save() {
        // Validasi form
        if (!this.validateForm()) {
            return;
        }

        // Data yang akan disimpan
        const rehireData = {
            employeeId: this.employeeId,
            employeeName: this.employeeName,
            tanggalMasuk: this.tanggalMasuk,
            kategori: this.selectedCategory,
            kodeToko: this.selectedStore,
            perusahaan: this.selectedCompany,
            departemen: this.selectedStatus,
            gender: this.selectedGender,
            noKK: this.noKK,
            noKTP: this.noKTP,
            jabatan: this.position,
            alamat: this.alamat,
            keterangan: this.keterangan
        };
        
        // Tampilkan pesan sukses
        this.messageService.add({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Data rehire karyawan berhasil disimpan!'
        });
        
        // Reset form setelah simpan
        this.resetForm();
    }

    validateForm(): boolean {
        if (!this.employeeId) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'ID Employee harus diisi!'
            });
            return false;
        }

        if (!this.employeeName) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Nama Karyawan harus diisi!'
            });
            return false;
        }

        if (!this.noKTP) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Nomor KTP harus diisi!'
            });
            return false;
        }

        return true;
    }

    close() {
        // Reset form
        this.resetForm();
        
        this.messageService.add({
            severity: 'info',
            summary: 'Dibatalkan',
            detail: 'Form rehire karyawan dibatalkan'
        });
    }

    resetForm() {
        this.employeeId = '';
        this.employeeName = '';
        this.tanggalMasuk = new Date();
        this.selectedCategory = null;
        this.selectedStore = null;
        this.selectedCompany = null;
        this.selectedStatus = null;
        this.selectedGender = null;
        this.noKK = '';
        this.noKTP = '';
        this.position = '';
        this.alamat = '';
        this.keterangan = '';
    }

    openAddDialog() {
        // Implementasi untuk membuka dialog tambah data
        this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Fitur dialog akan diimplementasikan'
        });
    }

    // Metode-metode yang sudah ada sebelumnya
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
        if (this.filter && this.filter.nativeElement) {
            this.filter.nativeElement.value = '';
        }
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
}