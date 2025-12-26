import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-upload-employee-dialog',
    standalone: true,
    imports: [
        FormsModule, InputTextModule, ButtonModule,
        DatePickerModule, SelectModule, MultiSelectModule,
        TextareaModule, FileUpload, ToastModule
    ],
    providers: [MessageService],
    template: `
    <div class="flex flex-wrap gap-6 items-center mb-4">
        <label for="uploadfile" style="margin-right: 8rem;">Choose File Excel</label>
        <div>
            <div class="p-2 border border-gray-400 rounded-lg w-149">
                <p-fileupload
                    #fu
                    mode="basic"
                    chooseLabel="Choose"
                    chooseIcon="pi pi-upload"
                    name="demo[]"
                    url="https://www.primefaces.org/cdn/api/upload.php"
                    accept="image/*"
                    maxFileSize="1000000"
                    (onUpload)="onUpload($event)"
                ></p-fileupload>
            </div>
            <p>Format File XLSX, XLS</p>
            <p-button label="TEMPLATE" (onClick)="fu.upload()" severity="contrast" size="small" icon="pi pi-file-excel" />
        </div>
    </div>
    <div class="flex gap-6 items-center justify-end">
        <p-button label="Simpan" size="small" icon="pi pi-save" (onClick)="fu.upload()" severity="info" />
    </div>
    `
})
export class UploadEmployeeDialogComponent {
    constructor(
        private messageService: MessageService,
        public ref: DynamicDialogRef
    ) {}


    onUpload(event: FileUploadEvent) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File uploaded successfully!'
        });
    }

    close() {
        this.ref.close();
    }
}
