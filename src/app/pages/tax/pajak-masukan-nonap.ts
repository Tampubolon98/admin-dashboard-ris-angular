import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormsModule } from "@angular/forms";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { DatePickerModule } from "primeng/datepicker";
import { Table, TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { ProgressBarModule } from "primeng/progressbar";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToastModule } from "primeng/toast";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeId from '@angular/common/locales/id';
import { LOCALE_ID } from '@angular/core';
import { format, parse } from 'date-fns';
import { InputNumberModule } from 'primeng/inputnumber';
import { MasterMasukan, MasterMasukanService, Supplier, Representative } from "../service/master-masukan.service";
import { AddPajakMasukanNonAP } from "./modal/add-pajak-masukan-nonap.component";

registerLocaleData(localeId);

@Component({
    selector: 'app-pajak-masukan-nonap',
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
        CommonModule,
        CheckboxModule,
        InputNumberModule
    ],
    templateUrl: 'view/index-pajak-masukan-nonap.html',
    providers: [ConfirmationService, MessageService, DialogService, MasterMasukanService, { provide: LOCALE_ID, useValue: 'id-ID' }]
})

export class PajakMasukanNonAP implements OnInit {
    taxnonap: MasterMasukan[] = [];
    selectedTaxNonap: MasterMasukan[] = [];
    selectedRow: MasterMasukan | null = null;
    representatives: Representative[] = [];
    loading: boolean = true;
    periodeAwal: Date | null = new Date;
    periodeAkhir: Date | null = new Date;
    ref: DynamicDialogRef | null = null;
    clonedTaxNonap: {[key: string]: MasterMasukan} = {};

    // edit untuk input npwp
    editing: boolean = false;
    originalNPWP: string = '';

    // menampilkan data di kolom input
    npwp: string = '';
    totalDppPpn: string = '';
    kode: string = '';
    userCreate: string = '';
    userModified: string = '';
    dateCreate: string = '';
    dateModified: string = '';
    bulan: string = '';
    statusAp: string = '';
    count: string = '';
    totalDppAll: number = 0;
    totalPpnAll: number = 0;
    totalAll: number = 0;

    // @ViewChild('filter') filter!: ElementRef
    @ViewChild('filter', {static: false}) filter!: ElementRef<HTMLInputElement>;

    constructor(
        private masterMasukanService: MasterMasukanService,
        private dialogService: DialogService,
        private messageService: MessageService
    ) {}

    // mengubah format tanggal menjadi yyyy-mm-dd
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    // melakukan otomatis set periode akhir ke tanggal akhir bulan
    onPeriodeAwalChange(date: Date | null) {
        if (!date) {
            this.periodeAkhir = null;
            return;
        }
        this.periodeAwal = date;

        // set periode akhir ke akhir bulan
        const endOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        );
        this.periodeAkhir = endOfMonth;
    }

    // melakukan load data untuk ditampilkan berdasarkan parameter start date dan end date
    loadTaxNonap() {
        if (this.periodeAwal && this.periodeAkhir) {
            const startDate = this.formatDate(this.periodeAwal);
            const endDate = this.formatDate(this.periodeAkhir);

            this.loading = true;
            this.masterMasukanService.getMasterMasukanNonap(startDate, endDate).
            subscribe({
                next: (res) => {
                    this.taxnonap = res;
                    this.calculateTotal();
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Date berhasil ditampilkan'
                    });
                },
                error: (err) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Gagal menampilkan data. Silahkan menghubungi teknikal'
                    })
                }
            });

        }
    }

    ngOnInit(): void {
         this.loadTaxNonap();
    }

    // method untuk format rupiah untuk kolom input
    formatCurrency(value: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    }

    // membuat format tanggal mm-yyyy untuk kolom input
    getMonthYearFromDate(dateValue: any): string {
        if (!dateValue) return '';
        try {
            let date: Date;
            if (dateValue instanceof Date) {
                date = dateValue;
            } else if (typeof dateValue === 'string') {
                date = new Date(dateValue);
                if (isNaN(date.getTime())) {
                    return '';
                }
            } else {
                return '';
            }

            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${year}`;
        } catch (err) {
            console.error('Error getting month year:', err);
            return '';
        }
    }

    // membuat format tanggal dd-MM-yyyy
    formatDateForDisplay(dateValue: any): string {
        if (!dateValue) return '';
        try {
            if (dateValue instanceof Date) {
                return format(dateValue, 'dd-MM-yyyy');
            }

            if (typeof dateValue === 'string') {
                const date = new Date(dateValue);
                return format(date, 'dd-MM-yyyy');
            }
            return '';
        } catch (err) {
            console.error('Error formatting date:', err);
            return '';
        }
    }

    // method untuk mengisi data input fields
    getFormFields(taxnonap: MasterMasukan) {
        const dpp = Number(taxnonap.dpp) || 0;
        const ppn = Number(taxnonap.ppn) || 0;
        const total = dpp + ppn;

        this.totalDppPpn = this.formatCurrency(total);
        this.count = this.formatCurrency(this.totalAll);
        this.npwp = taxnonap.npwp || '';
        this.kode = taxnonap.kode || '';
        this.userCreate = taxnonap.user_create || '';
        this.userModified = taxnonap.user_modified || '';
        this.dateCreate = this.formatDateForDisplay(taxnonap.date_create) || '';
        this.dateModified = this.formatDateForDisplay(taxnonap.date_modified) || '';
        this.statusAp = taxnonap.status_ap || '';
        this.bulan = this.getMonthYearFromDate(taxnonap.date_create);
    }

    // melakukan perhitungan total keseluruhan data dpp dan ppn
    calculateTotal() {
        this.totalDppAll = 0;
        this.totalPpnAll = 0;
        this.totalAll = 0;

        this.taxnonap.forEach(item => {
            const dpp = Number(item.dpp) || 0;
            const ppn = Number(item.ppn) || 0;

            this.totalDppAll += dpp;
            this.totalPpnAll += ppn;
        });
        this.totalAll = this.totalDppAll + this.totalPpnAll;
    }

    // melakukan perhitungan otomatis untuk nilai ppn
    calculateFromDPP(row: any) {
        const PPN_RATE = 0.11;

        if (row.dpp != null) {
            row.ppn = Math.round(row.dpp * PPN_RATE);
        }
    }

    // melakukan perhitungan otomatis untuk nilai dpp
    calculateFromPPN(row: any) {
        const PPN_RATE = 0.11;

        if (row.ppn != null) {
            row.dpp = Math.round(row.ppn / PPN_RATE);
        }
    }

    // menjalankan fungsi untuk menampilkan data pada kolom input tertentu
    onRowSelect(taxnonap: MasterMasukan) {
        this.selectedRow = taxnonap;
        this.npwp = taxnonap.npwp || '';
        this.originalNPWP = taxnonap.npwp || '';

        this.getFormFields(taxnonap);
    }

    // membuat toggle edit untuk membuka input edit di row table
    onRowEditInit(taxnonap: MasterMasukan) {
        this.onRowSelect(taxnonap);
        this.clonedTaxNonap[taxnonap.faktur_rmy as string] = { ...taxnonap };

        if (this.selectedRow && this.selectedRow.RELEASE !== '1') {
            this.editing = true;
            this.originalNPWP = this.npwp;
        }
    }

    // menjalankan proses edit data dari button edit
    onRowEditSave(taxnonap: MasterMasukan) {
        if (this.selectedRow && this.selectedRow.faktur_rmy === taxnonap.faktur_rmy) {
            taxnonap.npwp = this.npwp;
            // taxnonap.tgl_faktur = this.tgl_faktur;
        }

        taxnonap.user_modified = 'SYSTEM';
        taxnonap.date_modified = new Date().toISOString();

        this.masterMasukanService.updateMasterMasukanNonap(taxnonap.faktur_rmy, taxnonap)
        .subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Data berhasil diperbarui'
                });

                this.editing = false;
                this.originalNPWP = this.npwp;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Gagal',
                    detail: err?.message || 'Data gagal diperbarui'
                });
            }
        });
    }

    // membatalkan proses edit data di row table
    onRowEditCancel(taxnonap: MasterMasukan, index: number) {
        this.taxnonap[index] = this.clonedTaxNonap[taxnonap.faktur_rmy as string];
        delete this.clonedTaxNonap[taxnonap.faktur_rmy as string];
        this.cancelNPWPEdit();
    }

    // membatalkan proses edit data di input npwp
    cancelNPWPEdit(): void {
        this.npwp = this.originalNPWP;
        this.editing = false;
    }

    // membuat format tanggal dd-mm-yyyy untuk input row table
    formatDateInput(dateValue: any): string {
        if (!dateValue) return '';

        if (dateValue instanceof Date) {
            return format(dateValue, 'dd-MM-yyyy');
        }

        if (typeof dateValue === 'string') {
            const cleanDate = dateValue.split('T')[0];
            const parts = cleanDate.split('-');

            if (parts.length === 3) {
                if (parts[0].length === 4) {
                    return `${parts[2]}-${parts[1]}-${parts[0]}`;
                }

                return cleanDate
            }
        }
        return '';
    }

    onDateChange(value: string, taxnonap: any) {
        if (!value) {
            taxnonap.tax_date = null;
            taxnonap.tgl_faktur = null;
            return;
        }
        const [year, month, day] = value.split('-');
        taxnonap.tax_date = new Date(+day, +month - 1, +year);
        taxnonap.tgl_faktur = new Date(+day, +month - 1, +year);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // method untuk clear form field
    clearFormFields() {
        this.selectedRow = null;
        this.npwp = '';
        this.totalDppPpn = '';
        this.kode = '';
        this.userCreate = '';
        this.userModified = '';
        this.dateCreate = '';
        this.dateModified = '';
        this.bulan = '';
        this.statusAp = '';
        this.count = '';
    }

    clear(table: Table) {
        table.clear();
        // this.filter.nativeElement.value = '';
        if (this.filter && this.filter.nativeElement) {
            this.filter.nativeElement.value = '';
        }

        this.clearFormFields();
    }

    openAddDialog() {
        this.ref = this.dialogService.open(AddPajakMasukanNonAP, {
            header: 'Tambah Data Non A/P',
            width: '50%'
        });
    }
}