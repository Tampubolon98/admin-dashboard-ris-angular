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

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
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

        if (this.startDate && this.endDate) {
            const startDate = this.formatDate(this.startDate);
            const endDate = this.formatDate(this.endDate);
            const storecode = this.storecode;
            const suppliercode = this.supplierCode;
            const invoiceno = this.invoiceno;
            const trcode = this.trcode;
        
            this.loading = true;
            this.masterKeluaranService.createMasterKeluaran(startDate, endDate, invoiceno, suppliercode, trcode, storecode)
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: "success",
                        summary: 'Berhasil',
                        detail: "Data berhasil ditambahkan"
                    });
    
                    this.loading = false;
                    setTimeout(() => {
                        this.ref?.close(true);
                    }, 1200);
                },
                error: (err) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Gagal',
                        detail: err?.message || "Data gagal ditambahkan"
                    });
                }
            });
        }
    }

    ngOnInit(): void {
        
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