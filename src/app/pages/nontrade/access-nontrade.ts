import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { CommonModule } from "@angular/common";
import { Table, TableModule } from "primeng/table";
import { InputIconModule } from "primeng/inputicon";
import { SliderModule } from "primeng/slider";
import { ProgressBarModule } from "primeng/progressbar";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToastModule } from "primeng/toast";
import { InputTextModule } from "primeng/inputtext";
import { DatePickerModule } from "primeng/datepicker";
import { HttpClientModule } from "@angular/common/http";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Customer, CustomerService, Representative } from "../service/customer.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: 'app-access-nontrade',
    standalone: true,
    imports: [
        SelectModule, MultiSelectModule, FormsModule, ButtonModule, IconFieldModule, CommonModule, TableModule, InputIconModule, SliderModule, ProgressBarModule, ToggleButtonModule, ToastModule, InputTextModule, DatePickerModule, HttpClientModule
    ],
    templateUrl: 'view/index-access-nontrade.html',
    providers: [ConfirmationService, MessageService, CustomerService, DialogService]
})
export class AccessNontrade implements OnInit {
    selectedAttribute: any;
    selectedStore: any;
    selectedUser: any;
    selectedDepartment: any;
    selectedRole: any;
    representatives: Representative[] = [];
    ref: DynamicDialogRef | undefined;
    customers1: Customer[] = [];
    loading: boolean = true;

    attributeOptions = [
        {label: '1 || Kepala Kasir', value: 'KK'},
        {label: '2 || Mailing', value: 'M'},
        {label: '3 || Badget Holder Promosi', value: 'BHP'},
        {label: '4 || Cost Control', value: 'CC'},
        {label: '5 || Kas Kecil', value: 'KK'},
        {label: '6 || Accounting', value: 'A'},
        {label: '7 || Finance', value: 'F'}
    ];

    storeOptions = [
        {label: 'R088 || RAMAYANA PAYA KUMBUH', value: 'RPK'},
        {label: 'R125 || RAMAYANA JATINEGARA', value: 'RJ'},
        {label: 'RHO || RAMAYANA HEAD OFFICE', value: 'RHO'}
    ]

    userOptions = [
        {label: '0492657 || Simon Tampubolon', value: 'ST'},
        {label: '0490211 || Rizky', value: 'RK'}
    ]

    departmentOptions = [
        {label: '720 || Akuntansi', value: 'AK'},
        {label: '760 || Audit', value: 'AU'}
    ]

    roleOptions = [
        {label: 'Scan', value: 'Scan'},
        {label: 'Created', value: 'Created'}
    ]

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private dialogService: DialogService
    ){}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}