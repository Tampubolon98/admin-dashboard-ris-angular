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
    selector: 'app-edit-pajak-keluaran',
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
    templateUrl: '../view/modal-edit-pajak-keluaran.html',
    providers: [ConfirmationService, MessageService, DialogService, MasterKeluaranService]
})

export class EditPajakKeluaran {
    constructor(
        private masterKeluaranService: MasterKeluaranService,
        private messageService: MessageService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    customer_id: string = '';
    npwp: string = '';
    invoice_no: string = '';
    invoice_date: Date | undefined;
    name: string = '';
    address: string = '';
    city: string = '';
    postcode: string = '';
    pkp: string = '';
    user_create: string = '';
    date_create: Date | undefined;
    user_modified: string = '';
    date_modified: Date | undefined;
    store: string = '';
    inputdate: Date | null = new Date;
    invoicetaxdate: Date | null = new Date;
    input_date: Date | undefined;
    inv_tax_date: Date | undefined;
    tax_series_no: string = '';
    release: string = '';
    dateFormat: string = 'dd-mm-yy';
    loading: boolean = false;

    onDateInputChange(date: Date | null) {
        if (!date) {
            this.inputdate = null;
            return;
        }
        this.inputdate = date;
    }

    onDateInvoiceChange(date: Date | null) {
        if (!date) {
            this.invoicetaxdate = null;
            return;
        }
        this.invoicetaxdate = date;
    }

    ngOnInit() {
        const data = this.config.data?.taxkeluaran;
        console.log('cekkk', data);

        if (data) {
            this.customer_id = data.customer_id;
            this.npwp = data.npwp ?? '-';
            this.invoice_no = data.invoice_no;
            this.invoice_date = data.invoice_date ? new Date(data.invoice_date) : undefined;
            this.name = data.name ?? '-';
            this.address = data.address;
            this.city = data.city_nm;
            this.postcode = data.postcode;
            this.pkp = data.status_ap;
            this.user_create = data.user_create;
            this.date_create = data.date_create ? new Date(data.date_create) : undefined;
            this.user_modified = data.user_modified;
            this.date_modified = data.date_modified ? new Date(data.date_modified) : undefined;
            this.store = data.store;
            this.input_date = data.tgl_input ? new Date(data.tgl_input) : undefined;
            this.inv_tax_date = data.inv_tax_date ? new Date(data.inv_tax_date) : undefined;
            this.tax_series_no = data.tax_series_no ?? '-';
            this.release = data.process_tax_out;
        }
    }

    close() {
        this.ref.close();
    }
}