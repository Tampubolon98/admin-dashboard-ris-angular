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
  selector: 'app-add-brand-dialog',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule, MultiSelectModule, TextareaModule],
  template: `
    <div class="card flex flex-col gap-6 w-full">
        <div class="flex flex-col gap-2 w-full">
            <label for="uploadimage">MD Code</label>
            <input pInputText id="uploadimage" type="text" class="form-control" disabled />
        </div>

        <div class="flex flex-col gap-2 w-full">
            <label for="nik">Brand</label>
            <input pInputText id="nik" type="text" disabled />
        </div>

        <div class="flex flex-col gap-2 w-full">
            <label for="noktp">Supplier Name</label>
            <input pInputText id="nik" type="text" disabled />
        </div>
    </div>
  `
})
export class DetailBrandDialogComponent {
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
