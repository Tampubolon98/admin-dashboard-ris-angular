import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { TableModule } from "primeng/table";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-ttd-nontrade-list',
    imports: [
        InputTextModule, FormsModule, ButtonModule, DatePickerModule, IconFieldModule, InputIconModule, TableModule, SelectModule, MultiSelectModule, CommonModule
    ],
    templateUrl: '../view/ttd-nontrade-list.component.html'
})
export class TTDNontradeListComponent {
    date1: Date = new Date();
    dateFormat: string = 'dd/mm/yy';
    customers1: any[] = [];
    loading: boolean = false;
    representatives: any[] = [];
    first = 0;
    rows = 10;

    onGlobalFilter(dt: any, event: Event): void {
        const input = event.target as HTMLInputElement;
        dt.filterGlobal(input.value, 'contains');
    }

    clear(dt: any): void {
        dt.clear();
    }
}