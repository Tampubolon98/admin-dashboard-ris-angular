import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'app-ttd-nontrade-form',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        SelectModule,
        MultiSelectModule,
        TableModule,
        TagModule,
        AvatarModule,
        IconFieldModule,
        InputIconModule,
        DatePickerModule,
        FluidModule
    ],
    templateUrl: '../view/ttd-nontrade-form.component.html'
})
export class TtdNontradeFormComponent {
    date1: Date = new Date();
    dateFormat: string = 'dd/mm/yy';
    
    departmentOptions = [
        { label: 'IT', value: 'it' },
        { label: 'HR', value: 'hr' },
        { label: 'Finance', value: 'finance' }
    ];
    selectedDepartment: any;
    
    pembayaranOptions = [
        { label: 'Cash', value: 'cash' },
        { label: 'Transfer', value: 'transfer' },
        { label: 'Credit', value: 'credit' }
    ];
    selectedPembayaran: any;
    
    // Untuk table
    customers1: any[] = [];
    loading: boolean = false;
    representatives: any[] = [];
    
    onGlobalFilter(dt: any, event: Event): void {
        // Implement filter
        const input = event.target as HTMLInputElement;
        dt.filterGlobal(input.value, 'contains');
    }
    
    clear(dt: any): void {
        dt.clear();
    }
}