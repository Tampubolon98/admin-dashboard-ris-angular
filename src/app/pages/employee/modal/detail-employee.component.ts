import { Component } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { TextareaModule } from "primeng/textarea";
import { Country } from "@/pages/service/customer.service";
import { CheckboxModule } from "primeng/checkbox";
import { MasterKeluaranService, MasterKeluaran } from "@/pages/service/master-keluaran.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeId from '@angular/common/locales/id';
import { LOCALE_ID } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from "primeng/toast";
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OnInit } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: 'app-detail-employee-dialog',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    CheckboxModule,
    CommonModule,
    InputNumberModule,
    ToastModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  templateUrl: '../views/modal-detail-master-employee.html',
  providers: [ConfirmationService, MessageService, DialogService, MasterKeluaranService]
})

export class DetailMasterEmployeeComponent {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  employee: any = {};

  fullname: string = '';
  date_birth: Date | null = new Date;
  alamat: string = '';
  selectedStoreCode: string | undefined;
  selectedCompany: string | undefined;
  nohandphone: string = '';
  joinDate: Date | null = new Date;
  nik: string = '';
  noktp: string = '';
  uploadimage: string = '';
  jenis_kelamin: string = '';
  status: string = '';
  image_employee: string = '';
  selectedGender: any;
  selectedStatus: any;
  selectedCategory: any;
  countries: Country[] = [];
  selectedCountry: Country | undefined;
  loading: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  defaultImage = 'assets/image/default.png';

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

  categoryOptions = [
    {label: 'PKL', value: 'PKL'},
    {label: 'SPG', value: 'SPG'}
  ]

  statusOptions = [
    {label: 'Belum Menikah', value: '1'},
    {label: 'Menikah', value: '2'},
    {label: 'Janda', value: '4'},
    {label: 'Duda', value: '3'}
  ]

  close() {
    this.ref.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    console.log('adaaaa', file);

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    const data = this.config.data?.employee;

    if(data) {
        // this.image_employee = data.image_employee;
        this.image_employee =
        data.image_employee && data.image_employee.trim() !== ''
          ? data.image_employee
          : this.defaultImage;

        this.fullname = data.nama;
        this.alamat = data.alamat_rumah;
        this.nohandphone = data.no_handphone;
        this.nik = data.no_kk;
        this.noktp = data.no_ktp;
        this.jenis_kelamin = data.jenis_kelamin;
        this.status = data.status;

        console.log('cekkkkk', this.image_employee, data.image_employee);

        this.selectedCategory = this.categoryOptions.find(
          item => item.value === data.kategori_karyawan
        );

        this.selectedGender = this.genderOptions.find(
          item => item.value == data.jenis_kelamin
        );

        this.selectedStatus = this.statusOptions.find(
          item => item.value == data.status
        );
    }
   }
}
