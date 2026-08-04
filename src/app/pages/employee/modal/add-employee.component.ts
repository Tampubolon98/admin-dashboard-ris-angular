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
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterEmployeeService } from '@/pages/service/master-employee.service';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule, MultiSelectModule, TextareaModule, ToastModule, BlockUIModule, ProgressSpinnerModule, CommonModule],
  templateUrl: '../views/modal-add-master-employee.html',
  providers: [ConfirmationService, MessageService, MasterEmployeeService]
})
export class AddEmployeeDialogComponent {
  employee: any = {};
  fullname: string = '';
  date_birth: Date | null = new Date;
  alamat: string = '';
  selectedStoreCode: string | undefined;
  selectedCompany: string | undefined;
  nohandphone: string = '';
  joinDate: Date | null = new Date;
  nokk: string = '';
  noktp: string = '';
  uploadimage: string = '';
  selectedGender: any;
  selectedStatus: any;
  selectedCategory: any;
  dateFormat: string = 'dd-mm-yy';
  loading: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  countries: Country[] = [];

  selectedCountry: Country | undefined;

  constructor(
    private masterEmployeeService: MasterEmployeeService,
    public ref: DynamicDialogRef,
    private messageService: MessageService
  ) {}

  onDateBirthChange(date: Date | null) {
    if(!date) {
        this.date_birth = null;
        return;
    }
    this.date_birth = date;
  }

  onJoinDateChange(date: Date | null) {
    if(!date) {
        this.joinDate = null;
        return;
    }
    this.joinDate = date;
  }

  genderOptions = [
    { label: 'Laki-laki', value: 'L' },
    { label: 'Perempuan', value: 'P' }
  ];

  statusOptions = [
    {label: 'Belum Menikah', value: 'BM'},
    {label: 'Menikah', value: 'M'},
    {label: 'Janda', value: 'J'},
    {label: 'Duda', value: 'D'}
  ]

  categoryOptions = [
    {label: 'PKL', value: 'PKL'},
    {label: 'SPG', value: 'SPG'}
  ]

  showError(message: string) {
    this.messageService.add({
        severity: 'warn',
        summary: 'Input Kosong',
        detail: message
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  
  saveData() {
    if(!this.imagePreview) {
        this.showError('Silahkan Upload Image');
        return;
    }

    if (!this.fullname) {
        this.showError('Nama Employee Wajib Diisi');
        return;
    }

    if (!this.selectedCategory) {
        this.showError('Silahkan Pilih Kategori Karyawan');
        return;
    }

    if (!this.alamat) {
        this.showError('Alamat Wajib Diisi');
        return;
    }

    if (!this.selectedStoreCode) {
      this.showError('Silahkan Pilih Store Code');
    }

    if (!this.selectedCompany) {
        this.showError('Silahkan Pilih Perusahaan');
        return;
    }

    if (!this.nohandphone) {
        this.showError('No Handphone Wajib Diisi');
        return;
    }

    if (!this.nokk) {
        this.showError('No Kartu Keluarga Wajib Diisi');
        return;
    }

    if (!this.noktp) {
        this.showError('No KTP Wajib Diisi');
        return;
    }

    if (!this.selectedGender) {
        this.showError('Silahkan Pilih Jenis Kelamin');
        return;
    }

    if (!this.selectedStatus) {
        this.showError('Silahkan Pilih Status Karyawan');
        return;
    }
  }

  close() {
    this.ref.close();
  }

  ngOnInit() {
    this.saveData();

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
