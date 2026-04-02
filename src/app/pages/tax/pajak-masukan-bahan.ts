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
import { MasterMasukan, MasterMasukanService, Representative } from "../service/master-masukan.service";

registerLocaleData(localeId);

@Component({
    selector: 'app-pajak-masukan-bahan',
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
    templateUrl: 'view/index-pajak-masukan-bahan.html',
    providers: [ConfirmationService, MessageService, DialogService, MasterMasukanService, { provide: LOCALE_ID, useValue: 'id-ID' }]
})

export class PajakMasukanBahan implements OnInit {
    taxbahan: MasterMasukan[] = [];
    taxbahans!: MasterMasukan[];
    selectedTaxBahan: MasterMasukan[] = [];
    selectedRow: MasterMasukan | null = null;
    representatives: Representative[] = [];
    loading: boolean = true;
    periodeAwal: Date | null = new Date;
    periodeAkhir: Date | null = new Date;
    updateStatus: string = '';
    ref: DynamicDialogRef | null = null;
    clonedTaxbahan: { [key: string]: MasterMasukan } = {};

    // isEditingNPWP: boolean = false;
    editing: boolean = false;
    originalNPWP: string = '';

    // Variabel untuk data form
    npwp: string = '';
    totalDppPpn: string = '';
    kode: string = '';
    userCreate: string = '';
    userModified: string = '';
    statusAp: string = '';
    bulan: string = '';
    dateCreate: string = '';
    dateModified: string = '';
    count: string = '';

    totalDppAll: number = 0;
    totalPpnAll: number = 0;
    totalAll: number = 0;

    // @ViewChild('filter') filter!: ElementRef;
    @ViewChild('filter', { static: false }) filter!: ElementRef<HTMLInputElement>;

    constructor(
        private masterMasukanService: MasterMasukanService,
        private dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadTaxBahan();
    }

    formatDateInput(dateValue: any): string {
        if (!dateValue) return '';

        // Jika Date object
        if (dateValue instanceof Date) {
            return format(dateValue, 'dd-MM-yyyy');
        }

        // Jika string (ISO / dengan timestamp)
        if (typeof dateValue === 'string') {

            // Buang timestamp jika ada (ambil sebelum T)
            const cleanDate = dateValue.split('T')[0];
            const parts = cleanDate.split('-');

            if (parts.length === 3) {
                if (parts[0].length === 4) {
                    return `${parts[2]}-${parts[1]}-${parts[0]}`;
                }

                return cleanDate;
            }
        }
        return '';
    }

    onDateChange(value: string, taxbahan: any) {
        if (!value) {
            taxbahan.tax_date = null;
            return;
        }
        const [year, month, day] = value.split('-');

        // taxbahan.tax_date = new Date(+year, +month - 1, +day);
        taxbahan.tax_date = new Date(+day, +month - 1, +year);
    }

    onRowEditInit(taxbahan: MasterMasukan) {
        this.onRowSelect(taxbahan);
        this.clonedTaxbahan[taxbahan.faktur_rmy as string] = { ...taxbahan };
        
        if (this.selectedRow && this.selectedRow.RELEASE !== '1') {
            this.editing = true;
            this.originalNPWP = this.npwp;
        }
    }

    onRowEditSave(taxbahan: MasterMasukan) {
        if (this.selectedRow && this.selectedRow.faktur_rmy === taxbahan.faktur_rmy) {
            taxbahan.npwp = this.npwp;
        }

        taxbahan.user_modified = 'SYSTEM';
        taxbahan.date_modified = new Date().toISOString();

        // this.saveNPWPEdit();
        this.masterMasukanService
            .updateMasterMasukanBahan(taxbahan.faktur_rmy!, taxbahan)
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

    onRowEditCancel(taxbahan: MasterMasukan, index: number) {
        this.taxbahan[index] = this.clonedTaxbahan[taxbahan.faktur_rmy as string];
        delete this.clonedTaxbahan[taxbahan.faktur_rmy as string];
        this.cancelNPWPEdit();
    }

    onPeriodeAwalChange(date: Date | null) {
        if (!date) {
            this.periodeAkhir = null;
            return;
        }
        this.periodeAwal = date;

        // Set Periode Akhir ke akhir bulan
        const endOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        );
        this.periodeAkhir = endOfMonth;
    }

    cancelNPWPEdit(): void {
        this.npwp = this.originalNPWP;
        this.editing = false;
    }

    // Tambahkan method untuk handle klik row
    onRowSelect(taxbahan: MasterMasukan) {
        this.selectedRow = taxbahan;
        this.npwp = taxbahan.npwp || '';
        this.originalNPWP = taxbahan.npwp || '';

        this.populateFormFields(taxbahan);
    }

    // Method untuk mengisi form fields dari data row
    populateFormFields(taxbahan: MasterMasukan) {
        const dpp = Number(taxbahan.dpp) || 0;
        const ppn = Number(taxbahan.ppn) || 0;
        const total = dpp + ppn;

        this.totalDppPpn = this.formatCurrency(total);
        this.count = this.formatCurrency(this.totalAll);
        
        this.npwp = taxbahan.npwp || '';
        this.kode = taxbahan.kode || '';
        this.userCreate = taxbahan.user_create || '';
        this.userModified = taxbahan.user_modified || '';
        this.statusAp = taxbahan.status_ap || '';
        
        this.dateCreate = taxbahan.date_create ? 
            this.formatDateForDisplay(taxbahan.date_create) : '';
        this.dateModified = taxbahan.date_modified ? 
            this.formatDateForDisplay(taxbahan.date_modified) : '';
        this.bulan = this.getMonthYearFromDate(taxbahan.date_create);
    }

    calculateTotals() {
        // Reset totals
        this.totalDppAll = 0;
        this.totalPpnAll = 0;
        this.totalAll = 0;
        
        this.taxbahan.forEach(item => {
            const dpp = Number(item.dpp) || 0;
            const ppn = Number(item.ppn) || 0;
            
            this.totalDppAll += dpp;
            this.totalPpnAll += ppn;
        });
        
        this.totalAll = this.totalDppAll + this.totalPpnAll;
    }

    // Helper method untuk format currency
    formatCurrency(value: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    }

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
            
        } catch (error) {
            console.error('Error getting month year:', error);
            return '';
        }
    }

    // Helper method untuk format tanggal
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
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    }

    loadTaxBahan() {
        if (this.periodeAwal && this.periodeAkhir) {
            const startDate = this.formatDate(this.periodeAwal);
            const endDate = this.formatDate(this.periodeAkhir);
            this.loading = true;
            this.masterMasukanService.getMasterMasukanBahan(startDate, endDate).
            subscribe({
                next: (res) => {
                    this.taxbahan = res;
                    this.calculateTotals();
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: "Data loaded successfully"
                    });
                },
                error: (err) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load data. Please check you API connection.'
                    });
                }
            });
        }
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        // this.filter.nativeElement.value = '';
        if (this.filter && this.filter.nativeElement) {
            this.filter.nativeElement.value = '';
        }

        this.clearFormFields();
    }

    // Method untuk clear form fields
    clearFormFields() {
        this.selectedRow = null;
        this.npwp = '';
        this.totalDppPpn = '';
        this.kode = '';
        this.userCreate = '';
        this.userModified = '';
        this.statusAp = '';
        this.bulan = '';
        this.dateCreate = '';
        this.dateModified = '';
        this.count = '';
    }
}