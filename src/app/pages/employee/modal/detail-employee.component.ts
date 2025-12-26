import { Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { Country, Customer, CustomerService, Representative } from '../../service/customer.service';
import { TextareaModule } from 'primeng/textarea';
import { Table, TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-employee-dialog',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule, MultiSelectModule, TextareaModule, TableModule, InputIconModule, IconFieldModule, CommonModule, DatePipe],
  template: `
    <div class="card flex flex-col gap-6 w-full">
        <div class="flex flex-col md:flex-row gap-6">
            <div class="flex flex-col gap-2 w-full">
                <label for="fullname">Nama Karyawan</label>
                <input pInputText id="fullname" type="text" disabled />
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="date_birth">Tanggal Lahir</label>
                <p-datepicker 
                    [(ngModel)]="date1" 
                    [showIcon]="true" 
                    [dateFormat]="dateFormat"
                    inputId="date_birth" 
                    [showOnFocus]="true" disabled />
            </div>
        </div>

        <div class="flex flex-col gap-2 w-full">
            <label for="alamat">Alamat</label>
            <textarea pTextarea id="alamat" rows="4" style="border: 1px solid #E3E3E3; border-radius: 10px;" disabled></textarea>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
            <div class="flex flex-col gap-2 w-full">
                <label for="kodetoko">Kode Toko</label>
                <p-select 
                    [options]="countries"
                    [(ngModel)]="selectedCountry"
                    optionLabel="name"
                    [filter]="true"
                    filterBy="name"
                    [showClear]="true"
                    placeholder="Select a store code"
                    class="w-full md:w-95"
                    disabled
                >
                    <ng-template #selectedItem let-selectedOption>
                        <div class="flex items-center gap-2">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                                [class]="'flag flag-' + (selectedCountry?.code?.toLowerCase() || '')"
                                style="width: 18px"
                            />
                            <div>{{ selectedOption.name }}</div>
                        </div>
                    </ng-template>

                    <ng-template let-country #item>
                        <div class="flex items-center gap-2">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                                [class]="'flag flag-' + country.code.toLowerCase()"
                                style="width: 18px"
                            />
                            <div>{{ country.name }}</div>
                        </div>
                    </ng-template>
                </p-select>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="birthday">Perusahaan</label>
                <p-select 
                    [options]="countries"
                    [(ngModel)]="selectedCountry"
                    optionLabel="name"
                    [filter]="true"
                    filterBy="name"
                    [showClear]="true"
                    placeholder="Select perusahaan"
                    class="w-full md:w-95"
                    disabled
                >
                    <ng-template #selectedItem let-selectedOption>
                        <div class="flex items-center gap-2">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                                [class]="'flag flag-' + (selectedCountry?.code?.toLowerCase() || '')"
                                style="width: 18px"
                            />
                            <div>{{ selectedOption.name }}</div>
                        </div>
                    </ng-template>

                    <ng-template let-country #item>
                        <div class="flex items-center gap-2">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                                [class]="'flag flag-' + country.code.toLowerCase()"
                                style="width: 18px"
                            />
                            <div>{{ country.name }}</div>
                        </div>
                    </ng-template>
                </p-select>
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
            <div class="flex flex-col gap-2 w-full">
                <label for="nohandphone">No Handphone</label>
                <input pInputText id="nohandphone" type="text" disabled />
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="joindate">Tanggal Masuk</label>
                <p-datepicker 
                    [(ngModel)]="date2" 
                    [showIcon]="true" 
                    [dateFormat]="dateFormat"
                    inputId="joindate" 
                    [showOnFocus]="true" disabled />
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
            <div class="flex flex-col gap-2 w-full">
                <label for="nik">Nomor Kartu Keluarga</label>
                <input pInputText id="nik" type="text" disabled />
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="noktp">Nomor KTP</label>
                <input pInputText id="nik" type="text" disabled />
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
            <div class="flex flex-col gap-2 w-full">
                <label for="jeniskelamin">Jenis Kelamin</label>
                <p-select 
                    [options]="genderOptions"
                    [(ngModel)]="selectedGender"
                    optionLabel="label"
                    [showClear]="true"
                    placeholder="Pilih Jenis Kelamin"
                    class="w-full"
                    disabled
                >
                </p-select>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label for="status">Status</label>
                <p-select 
                    [options]="statusOptions"
                    [(ngModel)]="selectedStatus"
                    optionLabel="label"
                    [showClear]="true"
                    placeholder="Pilih Status"
                    class="w-full"
                    disabled
                >
                </p-select>
            </div>
        </div>

        <p-table
                #dt1
                [value]="customers1"
                dataKey="id"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                responsiveLayout="scroll"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-column sm:flex-row">
                        <button pButton label="Clear" class="p-button-outlined mb-2" icon="pi pi-filter-slash" (click)="clear(dt1)"></button>
                        <p-iconfield iconPosition="left" class="ml-auto">
                            <p-inputicon>
                                <i class="pi pi-search"></i>
                            </p-inputicon>
                            <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                        </p-iconfield>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Perusahaan
                                <p-columnFilter type="text" field="name" display="menu" placeholder="Search by name"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                ID Karyawan
                                <p-columnFilter type="text" field="country.name" display="menu" placeholder="Search by country"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 14rem">
                            <div class="flex justify-between items-center">
                                Kode Toko
                                <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                                    <ng-template #header>
                                        <div class="px-3 pt-3 pb-0">
                                            <span class="font-bold">Agent Picker</span>
                                        </div>
                                    </ng-template>
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-multiselect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" styleClass="w-full">
                                            <ng-template let-option #item>
                                                <div class="flex items-center gap-2 w-44">
                                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="32" />
                                                    <span>{{ option.name }}</span>
                                                </div>
                                            </ng-template>
                                        </p-multiselect>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Brand
                                <p-columnFilter type="date" field="date" display="menu" placeholder="mm/dd/yyyy"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Tanggal Masuk
                                <p-columnFilter type="numeric" field="balance" display="menu" currency="USD"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Tanggal Keluar
                                <p-columnFilter type="numeric" field="balance" display="menu" currency="USD"></p-columnFilter>
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30" />
                                <span>{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span class="image-text">{{ customer.representative.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.date | date: 'MM/dd/yyyy' }}
                        </td>
                        <td>
                            {{ customer.balance | currency: 'USD' : 'symbol' }}
                        </td>
                        <td>
                            {{ customer.balance | currency: 'USD' : 'symbol' }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No customers found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Loading customers data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>
    </div>
  `
})
export class DetailEmployeeDialogComponent {
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    public ref: DynamicDialogRef,
    private customerService: CustomerService
  ) {}

  employee: any = {};

  customers1: Customer[] = [];

  date1: Date | undefined;

  date2: Date | undefined;

  date3: Date | undefined;

  loading: boolean = true;

  dateFormat: string = 'dd-mm-yy';

  countries: Country[] = [];

  representatives: Representative[] = [];

  selectedCountry: Country | undefined;

  genderOptions = [
    { label: 'Laki-laki', value: 'L' },
    { label: 'Perempuan', value: 'P' }
  ];
  selectedGender: any;

  statusOptions = [
    {label: 'Belum Menikah', value: 'BM'},
    {label: 'Menikah', value: 'M'},
    {label: 'Janda', value: 'J'},
    {label: 'Duda', value: 'D'}
  ]
  selectedStatus: any;

  categoryOptions = [
    {label: 'PKL', value: 'PKL'},
    {label: 'SPG', value: 'SPG'}
  ]
  selectedCategory: any;

  save() {
    this.ref.close(this.employee);
  }

  close() {
    this.ref.close();
  }

  onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

  ngOnInit() {
    this.date1 = new Date();
    this.date2 = new Date();
    this.date3 = new Date();

    this.customerService.getCustomersLarge().then((customers) => {
        this.customers1 = customers;
        this.loading = false;

        // @ts-ignore
        this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
    });

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
}
