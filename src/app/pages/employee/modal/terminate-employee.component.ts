import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { Country } from '../../service/customer.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-terminate-employee-dialog',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule, MultiSelectModule, TextareaModule],
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

        <div class="flex flex-col gap-2 w-95">
            <label for="outdate">Tanggal Keluar</label>
            <p-datepicker 
                [(ngModel)]="date3" 
                [showIcon]="true" 
                [dateFormat]="dateFormat"
                inputId="outdate" 
                [showOnFocus]="true" />
        </div>

        <div class="flex flex-col gap-2 w-full">
            <label for="notekerja">Catatan Kerja Karyawan</label>
            <textarea pTextarea id="notekerja" rows="4" style="border: 1px solid #E3E3E3; border-radius: 10px;"></textarea>
        </div>

        <div class="mt-4 flex justify-end">
            <button pButton size="small" label="Terminate" (click)="save()" class="mr-2" icon="pi pi-save"></button>
            <button pButton size="small" label="Batal" severity="danger" (click)="close()" icon="pi pi-times"></button>
        </div>
    </div>
  `
})
export class TerminateEmployeeDialogComponent {
  constructor(public ref: DynamicDialogRef) {}

  employee: any = {};

  date1: Date | undefined;

  date2: Date | undefined;

  date3: Date | undefined;

  dateFormat: string = 'dd-mm-yy';

  countries: Country[] = [];

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

  ngOnInit() {
    this.date1 = new Date();
    this.date2 = new Date();
    this.date3 = new Date();

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
