import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { IconFieldModule } from "primeng/iconfield";
import { DatePickerModule } from "primeng/datepicker";
import { InputIconModule } from "primeng/inputicon";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@Component({
    selector: 'app-ttd-nontrade-history',
    imports: [
        FormsModule, CommonModule, SelectModule, MultiSelectModule, TableModule, IconFieldModule, DatePickerModule, InputIconModule, ButtonModule, InputTextModule
    ],
    templateUrl: '../view/ttd-nontrade-history.component.html'
})
export class TTDNontradeHistoryComponent {
    customers1: any[] = [];
    loading: boolean = false;
    representatives: any[] = [];

    clear(dt: any): void {
        dt.clear();
    }

    onGlobalFilter(dt: any, event: Event): void {
        const input = event.target as HTMLInputElement;
        dt.filterGlobal(input.value, 'contains');
    }
}