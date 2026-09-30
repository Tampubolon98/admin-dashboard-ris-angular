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
    statuses: any[] = [];
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    balanceFrozen: boolean = false;
    loading: boolean = true;
    selectedCategory: any;
    selectedStoreCode: any;
    dateRange: Date[] | null = null;
    dateFormat: string = 'dd-mm-yy';
    ref: DynamicDialogRef | undefined;
    id_batch: string | null = null;

    constructor(
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

    loadMembers() {
        this.loading = true;
        this.memberMilkyverseService.getMemberPembayaran().subscribe({
            next: (res) => {
                console.log("cek1", res);
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

    ngOnInit() {
        this.loadMembers();
    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
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
