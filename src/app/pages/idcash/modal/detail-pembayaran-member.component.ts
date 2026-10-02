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
import { Supplier, MasterMasukanService, MasterMasukan } from "@/pages/service/master-masukan.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeId from '@angular/common/locales/id';
import { LOCALE_ID } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from "primeng/toast";
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogConfig } from "primeng/dynamicdialog";


@Component({
    selector: 'app-detail-pembayaran-member',
    standalone: true,
    imports: [
        TableModule,
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
    templateUrl: '../views/modal-detail-pembayaran-member.html',
    styles: [`
        .dialog-center-header .p-dialog-header {
            position: relative;
            justify-content: center;
        }

        .dialog-center-header .p-dialog-title {
            margin: 0 auto;
            text-align: center;
        }

        .dialog-center-header .p-dialog-header-close {
            position: absolute;
            right: 1rem;
        }
    `],
    providers: [ConfirmationService, MessageService, DialogService, MasterMasukanService]
})

export class DetailPembayaranMember {
    id_batch: string = '';
    total_pembayaran: string = '';
    tanggal_transfer: Date | null = null;
    member: any[] = [];
    loading: boolean = true;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ){}

    close() {
        this.ref.close();
    }

    getTotalNominal(): number {
        return this.member.reduce((total, item) => {
            return total + Number(item.nominal_transfer || 0);
        }, 0);
    }

    ngOnInit() {
        const data = this.config.data.detail;
         this.member = this.config.data.detail ?? [];
        const total_nominal = this.config.data.total_nominal;

        this.id_batch = data[0].id_kasbon;
        this.tanggal_transfer = new Date(data[0].tanggal_transfer);
        this.total_pembayaran = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Number(total_nominal));
        this.loading = false;
    }
}