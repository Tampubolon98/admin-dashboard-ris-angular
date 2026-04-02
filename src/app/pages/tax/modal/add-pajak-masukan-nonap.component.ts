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

registerLocaleData(localeId);

@Component({
    selector: 'app-add-pajak-masukan-nonap',
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
    templateUrl: '../view/modal-add-pajak-masukan-nonap.html',
    providers: [ConfirmationService, MessageService, DialogService, MasterMasukanService, { provide: LOCALE_ID, useValue: 'id-ID' }]
})

export class AddPajakMasukanNonAP {
    employee: any = {};
    date2: Date | undefined;
    date3: Date | undefined;
    dateFormat: string = 'dd-mm-yy';
    supplier: Supplier[] = [];
    selectedSupplier: string | undefined;
    dateTax: Date | null = new Date;
    tanggalMasa: Date | null = new Date;
    datePenerimaan: Date | null = new Date;
    filterSupplier!: Supplier[];
    filterValue: string = '';
    dpp: number = 0;
    dppNilaiLain: number = 0;
    ppn: number = 0;
    countries: Country[] = [];
    selectedCountry: Country | undefined;
    npwp: string = '';
    faktur_rmy: string = '';
    tax_series: string = '';
    taxnonap: MasterMasukan = {} as MasterMasukan;
    release: string = '';
    loading: boolean = false;

    constructor(
    private masterMasukanService: MasterMasukanService,
    private dialogService: DialogService,
    private messageService: MessageService,
    public ref: DynamicDialogRef
    ) {}

    onDateTaxChange(date: Date | null) {
        if (!date) {
            this.dateTax = null;
            return;
        }
        this.dateTax = date;
    }

    onDatePenerimaanChange(date: Date | null) {
        if (!date) {
            this.datePenerimaan = null;
            return;
        }
        this.datePenerimaan = date;
    }

    onDateMasaChange(date: Date | null) {
        if (!date) {
            this.tanggalMasa = null;
            return;
        }
        this.tanggalMasa = date;
    }

    formatTaxSeries(event: any) {
        let value = event.target.value;

        // Hanya ambil angka
        value = value.replace(/\D/g, '');

        // Format 3.3.sisa
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3.$4');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d+)/, '$1.$2');
        }

        this.tax_series = value;
    }

    calculateFromDPP() {
        if (!this.dpp) return;

        this.ppn = Math.round(this.dpp * 0.11);
        this.dppNilaiLain = Math.round(this.dpp * 11 / 12);
    }

    calculateFromPPN() {
        if (!this.ppn) return;

        this.dpp = Math.round(this.ppn / 0.11);
        this.dppNilaiLain = Math.round(this.dpp * 11 / 12);
    }

    showError(message: string) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Input Kosong',
            detail: message
        });
    }

    saveData() {
        if (!this.faktur_rmy) {
            this.showError('Faktur Wajib Diisi');
            return;
        }

        if (!this.tax_series) {
            this.showError('Tax Series Wajib Diisi');
            return;
        }

        if (!this.npwp) {
            this.showError('NPWP Wajib Diisi');
            return;
        }

        if (!this.selectedSupplier) {
            this.showError('Silahkan Pilih Supplier');
            return;
        }

        if (!this.dpp || !this.ppn) {
            this.showError('DPP & PPN Wajib Diisi');
            return;
        }

        this.taxnonap.kode = 'N';
        this.taxnonap.supplier_code = this.supplier[0].supplier_code;
        this.taxnonap.faktur_rmy = this.faktur_rmy;
        this.taxnonap.no_seri = this.tax_series;
        this.taxnonap.npwp = this.npwp;
        this.taxnonap.pay_date = this.tanggalMasa?.toISOString();
        this.taxnonap.tgl_faktur = this.datePenerimaan?.toISOString();
        this.taxnonap.tax_date = this.dateTax?.toISOString();
        this.taxnonap.dpp = this.dpp;
        this.taxnonap.ppn = this.ppn;
        this.taxnonap.RELEASE = this.release ? '1' : '0';
        this.taxnonap.user_create = 'SYSTEM';
        this.taxnonap.date_create = new Date().toISOString();
        this.taxnonap.user_modified = 'SYSTEM';
        this.taxnonap.date_modified = new Date().toISOString();

        this.masterMasukanService.createMasterMasukanNonap(this.taxnonap)
        .subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Data berhasil ditambahkan'
                });

                setTimeout(() => {
                    this.ref.close(true);
                }, 1200);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Gagal',
                    detail: err?.message || 'Data gagal ditambahkan'
                });
            }
        });
    }

    loadSupplier() {
        this.masterMasukanService.getSupplier().subscribe({
            next: (data) => {
                this.supplier = data;
            },
            error: (err) => {
                console.error('Gagal mendapatkan data:', err);
            }
        });
    }

    close() {
        this.ref.close();
    }

    ngOnInit() {
        this.loadSupplier();        
        this.date2 = new Date();
        this.date3 = new Date();
        this.saveData();
    }
}