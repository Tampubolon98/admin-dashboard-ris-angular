import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from '@angular/forms';
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { DatePickerModule } from "primeng/datepicker";
import { Table, TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { ProgressBarModule } from "primeng/progressbar";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToastModule } from "primeng/toast";
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from "@angular/common";
import { MasterKeluaran, MasterKeluaranService, Representative } from "../service/master-keluaran.service";
import { take, takeLast } from "rxjs";


@Component({
    selector: 'app-input-pajak-keluaran',
    standalone: true,
    imports: [
        FormsModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        IconFieldModule,
        DatePickerModule,
        TableModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        BlockUIModule,
        ProgressSpinnerModule,
        CommonModule
    ],
    templateUrl: 'view/index-input-pajak-keluaran.html',
    providers: [ConfirmationService, MessageService, MasterKeluaranService, DialogService]
})

export class InputPajakKeluaran implements OnInit {
    startDate: Date | null = new Date;
    endDate: Date | null = new Date;
    taxkeluaran: MasterKeluaran[] = [];
    selectedTaxKeluaran: MasterKeluaran[] = [];
    loading: boolean = false;
    representatives: Representative[] = [];
    ref: DynamicDialogRef | undefined;
    storecode: string = '';
    invoiceno: string = '';
    supplierCode: string = '';
    trcode: string = '';
    selectedUnit: string | undefined;
    addtaxkeluaran: MasterKeluaran = {} as MasterKeluaran;

    constructor(
        private masterKeluaranService: MasterKeluaranService,
        private messageService: MessageService,
        private dialogService: DialogService
    ) {}

    onStartDateChange(date: Date | null) {
        if (!date) {
            this.startDate = null;
            return;
        }
        this.startDate = date;
    }

    onEndDateChange(date: Date | null) {
        if (!date) {
            this.endDate = null;
            return;
        }
        this.endDate = date;
    }

    unitOptions = [
        {label: 'Fashion', value: 'Fashion'},
        {label: 'Supermarket', value: 'Supermarket'}
    ];

    @ViewChild('filter') filter!: ElementRef;

    showError(message: string) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Input Kosong',
            detail: message
        });
    }

    saveData() {
        if (!this.storecode) {
            this.showError('Store Code Wajib Diisi');
            return;
        }

        if (!this.invoiceno) {
            this.showError('Invoice No Wajib Diisi');
            return;
        }

        if (!this.supplierCode) {
            this.showError('Supplier Code Wajib Diisi');
            return;
        }

        if (!this.trcode) {
            this.showError('Transaction Code Wajib Diisi');
            return;
        }

        this.addtaxkeluaran.company_code = '1';
        this.addtaxkeluaran.outlet_code = this.storecode;
        this.addtaxkeluaran.customer_id = this.supplierCode;
        this.addtaxkeluaran.invoice_no = this.invoiceno;
        this.addtaxkeluaran.tr_code = this.trcode + '-' + this.selectedUnit;
        this.addtaxkeluaran.user_create = "SYSTEM";
        this.addtaxkeluaran.date_create = new Date().toISOString();
        this.addtaxkeluaran.user_modified = "SYSTEM";
        this.addtaxkeluaran.date_modified = new Date().toISOString();

        this.masterKeluaranService.createMasterKeluaran(this.addtaxkeluaran)
        .subscribe({
            next: () => {
                this.messageService.add({
                    severity: "success",
                    summary: 'Berhasil',
                    detail: "Data berhasil ditambahkan"
                });

                setTimeout(() => {
                    this.ref?.close(true);
                }, 1200);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Gagal',
                    detail: err?.message || "Data gagal ditambahkan"
                });
            }
        });
    }

    ngOnInit(): void {
        this.saveData();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    close() {
        this.ref?.close();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}