import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from "@angular/forms";
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
import { CommonModule } from "@angular/common";
import { TabsModule } from "primeng/tabs";
import { Customer, CustomerService, Representative } from "../service/customer.service";
import { TtdNontradeFormComponent } from "./modal/ttd-nontrade-form.component";
import { TTDNontradeListComponent } from "./modal/ttd-nontrade-list.component";
import { TTDNontradeHistoryComponent } from "./modal/ttd-nontrade-history.component";

@Component({
    selector: 'app-ttd-nontrade',
    standalone: true,
    imports: [
        FormsModule, MultiSelectModule, SelectModule, InputIconModule, InputTextModule, ButtonModule, IconFieldModule, DatePickerModule, TableModule, SliderModule, ProgressBarModule, ToggleButtonModule, ToastModule, CommonModule, TabsModule, DatePickerModule, TtdNontradeFormComponent, TTDNontradeListComponent, TTDNontradeHistoryComponent
    ],
    templateUrl: 'view/index-ttd-nontrade.html',
    providers: [
        ConfirmationService, MessageService, CustomerService, DialogService
    ],
    styles: `
        /* Kecilkan padding tab */
        .custom-tablist .p-tab {
            padding: 2px !important;
        }

        .custom-tablist .p-tab .p-tab-nav {
            padding: 4px 10px !important;
        }

        /* Biarkan container tetap */
        .custom-tablist {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            overflow: hidden;
        }

        /* TAB TIDAK AKTIF */
        .custom-tablist .p-tab {
            background: #dc2626 !important; /* merah */
        }

        .custom-tablist .p-tab .p-tab-nav {
            color: white !important;
        }

        /* TAB AKTIF */
        .custom-tablist .p-tab.p-tab-active {
            background: white !important; /* putih full */
        }

        .custom-tablist .p-tab.p-tab-active .p-tab-nav {
            color: black !important;
        }

        /* Hover */
        .custom-tablist .p-tab-nav:hover {
            filter: brightness(1.1);
        }
        
        .p-tab:hover {
            border: 1px solid white;
        }

        :host ::ng-deep .p-ink-bar {
            background-color: white !important;
        }
    `
})

export class TTDNontrade implements OnInit {
    tabs: { title: string; value: number; content: string }[] = [];

    date1: Date | undefined;
    dateFormat: string = 'dd-mm-yy';
    selectedDepartment: any;
    selectedPembayaran: any;
    customers1: Customer[] = [];
    selectedCustomers1: Customer[] = [];
    loading: boolean = true
    representatives: Representative[] = [];

    @ViewChild('filter') filter!: ElementRef;

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    departmentOptions = [
        { label: 'Laki-laki', value: 'L' },
        { label: 'Perempuan', value: 'P' }
    ];


    pembayaranOptions = [
        { label: 'Laki-laki', value: 'L' },
        { label: 'Perempuan', value: 'P' }
    ];

    ngOnInit(): void {
        this.date1 = new Date();

        this.tabs = [
            { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
            { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
            { title: 'Tab 3', value: 2, content: 'Tab 3 Content' },
        ];
    }
}