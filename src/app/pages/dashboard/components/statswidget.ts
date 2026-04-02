import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterBrands, MasterBrandService, Representative } from '@/pages/service/master-brand.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { count, map, Observable } from 'rxjs';
import { MasterEmployeeService } from '@/pages/service/master-employee.service';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div *ngIf="totalBrand$ | async as total; else loading">
                        <span class="block text-muted-color font-medium mb-4">Brand</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ total }}</div>
                    </div>
                    <ng-template #loading>
                        <p>Loading total data...</p>
                    </ng-template>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-tag text-blue-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium" *ngIf="totalSupplier$ | async as total_supplier; else loading">{{ total_supplier }} </span>
                <span class="text-muted-color">total supplier </span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div *ngIf="totalEmployee$ | async as total_employee; else loading">
                        <span class="block text-muted-color font-medium mb-4">Employee</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ total_employee }}</div>
                    </div>
                    <ng-template #loading>
                        <p>Loading total data...</p>
                    </ng-template>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-user text-orange-500 text-xl!"></i>
                    </div>
                </div>
                <div *ngIf="totalSPG$ | async as total_spg; else loading">
                    <span class="text-primary font-medium">{{ total_spg }} </span>
                    <span class="text-muted-color">SPG | </span>

                    <span class="text-primary font-medium" *ngIf="totalPKL$ | async as total_pkl; else loading">{{ total_pkl }} </span>
                    <span class="text-muted-color">PKL</span>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Customers</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">28441</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">520 </span>
                <span class="text-muted-color">newly registered</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Comments</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152 Unread</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">85 </span>
                <span class="text-muted-color">responded</span>
            </div>
        </div>`,
        providers: [ConfirmationService, MessageService, MasterBrandService, DialogService]
})
export class StatsWidget implements OnInit {
    totalBrand$: Observable<number> | undefined; 

    totalEmployee$: Observable<number> | undefined;

    totalSPG$: Observable<number> | undefined;

    totalPKL$: Observable<number> | undefined;

    totalSupplier$: Observable<number> | undefined;

    representatives: Representative[] = [];

    loading: boolean = true;

    ref: DynamicDialogRef | undefined;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private masterBrandService: MasterBrandService,
        private masterEmployeeService: MasterEmployeeService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.totalBrand$ = this.masterBrandService.getMasterBrand().pipe(
            map(items => items.length)
        );

        this.totalEmployee$ = this.masterEmployeeService.getMasterEmployee().pipe(
            map(items => items.length)
        );

        this.totalSPG$ = this.masterEmployeeService.getEmployeeSPG().pipe(
            map(items => items.length)
        );


        this.totalPKL$ = this.masterEmployeeService.getEmployeePKL().pipe(
            map(items => items.length)
        );

        this.totalSupplier$ = this.masterBrandService.getMasterSupplier().pipe(
            map(items => items.length)
        );
    }
}
