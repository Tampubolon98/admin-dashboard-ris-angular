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
    selector: 'app-edit-master-employee',
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
    templateUrl: '../views/modal-edit-master-employee.html',
    providers: [ConfirmationService, MessageService, DialogService, MasterKeluaranService]
})

export class EditMasterEmployee {
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

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
    selectedGender: any;
    selectedStatus: any;
    selectedCategory: any;
    countries: Country[] = [];
    selectedCountry: Country | undefined;
    loading: boolean = false;

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
        {label: 'Belum Menikah', value: 'BM'},
        {label: 'Menikah', value: 'M'},
        {label: 'Janda', value: 'J'},
        {label: 'Duda', value: 'D'}
    ]

    close() {
        this.ref.close();
    }

    ngOnInit() {
        const data = this.config.data?.employee;

        if(data) {
            this.fullname = data.nama;
            this.alamat = data.alamat_rumah;
            this.nohandphone = data.no_handphone;
            this.nik = data.no_kk;
            this.noktp = data.no_ktp;
            this.jenis_kelamin = data.jenis_kelamin;
            this.status = data.status;
        }
    }
}