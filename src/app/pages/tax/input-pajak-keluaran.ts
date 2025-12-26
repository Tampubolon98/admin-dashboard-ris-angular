import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { Customer, CustomerService, Representative } from "../service/customer.service";
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
import { CommonModule } from "@angular/common";


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
        CommonModule
    ],
    templateUrl: 'view/index-input-pajak-keluaran.html',
    providers: [ConfirmationService, MessageService, CustomerService, DialogService]
})

export class InputPajakKeluaran implements OnInit {
    customers1: Customer[] = [];
    selectedCustomers1: Customer[] = [];
    invoiceDate: Date = new Date();
    selectedUnit: any;
    loading: boolean = true;
    representatives: Representative[] = [];
    ref: DynamicDialogRef | undefined;

    unitOptions = [
        {label: 'Fashion', value: 'Fashion'},
        {label: 'Supermarket', value: 'Supermarket'}
    ];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;

            // this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
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