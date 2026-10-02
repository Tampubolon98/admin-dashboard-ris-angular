import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { MemberMilkyverse, MemberMilkyverseService, Representative } from '../service/member-milkyverse.service';
import {ObjectUtils} from "primeng/utils";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DetailPembayaranMember } from "./modal/detail-pembayaran-member.component";
import { DynamicDialogConfig } from "primeng/dynamicdialog";


interface expandedRows {
    [key: string]: boolean;
}

interface Country {
    name: string;
    code: string;
}


@Component({
    selector: 'app-verifikasi-pembayaran-member',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        DatePickerModule
    ],
    templateUrl: `views/index-verifikasi-pembayaran-member.html`,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, DialogService, MemberMilkyverseService]
})
export class VerifikasiPembayaranMember implements OnInit {
    members: MemberMilkyverse[] = [];
    representatives: Representative[] = [];
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    loading: boolean = true;
    dateRange: Date[] | null = null;
    dateFormat: string = 'dd-mm-yy';
    ref: DynamicDialogRef | undefined;
    id_batch: string | null = null;

    constructor(
        // private config: DynamicDialogConfig,
        private dialogService: DialogService,
        private memberMilkyverseService: MemberMilkyverseService,
        private messageService: MessageService
    ) {}

    itemStatus = [
        {label: 'ALL STATUS', value: 'ALL STATUS'},
        {label: 'POSTING', value: 'POSTING'}
    ];
    selectedStatus: any | null = null;

    @ViewChild('filter') filter!: ElementRef;

    clearFilter() {
        this.dateRange = null;
        this.selectedStatus = null;
        this.id_batch = null;
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    loadMembers() {
        const periode = this.dateRange;

        const start_date = periode?.[0] ? this.formatDate(periode[0]) : null;
        const end_date = periode?.[1] ? this.formatDate(periode[1]) : null;
        const id_batch = this.id_batch;
        const status = this.selectedStatus?.value;

        this.loading = true;
        this.memberMilkyverseService.getMemberPembayaran(id_batch, status, start_date, end_date).subscribe({
            next: (res) => {
                this.members = res;
                this.loading = false;
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Data loaded successfully"
                });
            },
            error: (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to load data. Please check you API connection."
                });
            }
        });
    }

    loadDetailMember(id_batch: string) {
        this.loading = true;

        this.memberMilkyverseService.getDetailMemberPembayaran(id_batch).subscribe({
            next: (res) => {
                this.loading = false;

                this.ref = this.dialogService.open(DetailPembayaranMember, {
                    header: 'Detail Pembayaran Member',
                    width: '50%',
                    data: {
                        detail: res.data,
                        total_nominal: res.total_nominal
                    }
                });

                setTimeout(() => {
                    const dialog = document.querySelector('.p-dialog');

                    if (dialog) {
                        const title = dialog.querySelector('.p-dialog-title') as HTMLElement;

                        if (title) {
                            title.style.width = '100%';
                            title.style.textAlign = 'center';
                        }
                    }
                });
            },
            error: () => {
                this.loading = false;

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load detail data.'
                });
            }
        });
    }

    ngOnInit() {
        this.loadMembers();
    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }

    openDetailMember(member: MemberMilkyverse) {
        this.loadDetailMember(member.id_kasbon);
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
