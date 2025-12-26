import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormsModule } from "@angular/forms";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { DatePickerModule } from "primeng/datepicker";
import { Table, TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { ProgressBarModule } from "primeng/progressbar";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToastModule } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { Customer, CustomerService, Representative } from "../service/customer.service";

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
        CommonModule
    ],
    templateUrl: 'view/index-pajak-masukan-bahan.html',
    providers: [ConfirmationService, MessageService, DialogService, CustomerService]
})

export class PajakMasukanBahan implements OnInit {
    customers1: Customer[] = [];
    selectedCustomers1: Customer[] = [];
    representatives: Representative[] = [];
    loading: boolean = true;
    periodeAwal: Date = new Date();
    periodeAkhir: Date = new Date();
    ref: DynamicDialogRef | undefined;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}