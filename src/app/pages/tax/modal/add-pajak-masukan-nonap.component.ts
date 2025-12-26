import { Component } from "@angular/core";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { TextareaModule } from "primeng/textarea";
import { Country } from "@/pages/service/customer.service";
import { CheckboxModule } from "primeng/checkbox";

@Component({
    selector: 'app-add-pajak-masukan-nonap',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        ButtonModule,
        DatePickerModule,
        SelectModule,
        MultiSelectModule,
        TextareaModule,
        CheckboxModule
    ],
    templateUrl: '../view/modal-add-pajak-masukan-nonap.html'
})

export class AddPajakMasukanNonAP {
    constructor(public ref: DynamicDialogRef) {}

    employee: any = {};
    date2: Date | undefined;
    date3: Date | undefined;
    dateFormat: string = 'dd-mm-yy';

    categoryOptions = [
        {label: 'PKL', value: 'PKL'},
        {label: 'SPG', value: 'SPG'}
    ]
    selectedCategory: any;

    countries: Country[] = [];
    selectedCountry: Country | undefined;

    genderOptions = [
        {label: 'Laki-Laki', value: 'L'},
        {label: 'Perempuan', value: 'P'}
    ];
    selectedGender: any;

    statusOptions = [
        {label: 'Belum Menikah', value: 'BM'},
        {label: 'Menikah', value: 'M'},
        {label: 'Janda', value: 'J'},
        {label: 'Duda', value: 'D'}
    ];
    selectedStatus: any;

    save() {
        this.ref.close(this.employee);
    }

    close() {
        this.ref.close();
    }

    ngOnInit() {
        this.date2 = new Date();
        this.date3 = new Date();

        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }
}