import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-gauge', routerLink: ['/'] }]
            },
            {
                items: [
                    {
                        label: 'Human Resource',
                        icon: 'pi pi-fw pi-gauge',
                        items: [
                            {
                                label: 'Master Employee',
                                icon: 'pi pi-fw pi-circle',
                                items: [
                                    {
                                        label: 'Data Karyawan',
                                        icon: 'pi pi-fw pi-users',
                                        items: [
                                            { label: 'Data Karyawan', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/data-karyawan'] },
                                            { label: 'Master Brand', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/master-brand'] },
                                            { label: 'Mutasi Karyawan', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/mutasi-employee'] },
                                            { label: 'Rehire Karyawan', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/rehire-employee'] },
                                            { label: 'Terminate Karyawan', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/terminate-employee'] },
                                            { 
                                                label: 'Report Master Karyawan', 
                                                icon: 'pi pi-fw pi-star-half-fill',
                                                items: [
                                                    { label: 'Report CV', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/report-cv'] },
                                                    { label: 'Report Karyawan', icon: 'pi pi-fw pi-star-half', routerLink: '/masteremployee/report-employee' },
                                                    { label: 'Report Sales', icon: 'pi pi-fw pi-star-half', routerLink: ['/masteremployee/report-sales-id'] }
                                                ]
                                            },
                                        ]
                                    }
                                ]
                            }
                            // {
                            //     label: 'Master Employee',
                            //     icon: 'pi pi-fw pi-circle',
                            //     items: [
                            //         { label: 'Data Karyawan', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/data-karyawan'] },
                            //         { label: 'Master Brand', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/master-brand'] },
                            //         { label: 'Mutasi Karyawan', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/mutasi-employee'] },
                            //         { label: 'Rehire Karyawan', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/rehire-employee'] },
                            //         { label: 'Terminate Karyawan', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/terminate-employee'] },
                            //         { 
                            //             label: 'Report Master Karyawan', 
                            //             icon: 'pi pi-fw pi-bookmark',
                            //             items: [
                            //                 { label: 'Report CV', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/report-cv'] },
                            //                 { label: 'Report Karyawan', icon: 'pi pi-fw pi-bookmark', routerLink: '/masteremployee/report-employee' },
                            //                 { label: 'Report Sales', icon: 'pi pi-fw pi-bookmark', routerLink: ['/masteremployee/report-sales-id'] }
                            //             ]
                            //         },
                            //     ]
                            // }
                        ]
                    }
                ]
            },
            {
                items: [
                    { label: 'Tax', icon: 'pi pi-fw pi-gauge', items: [
                        { 
                            label: 'Tax', 
                            icon: 'pi pi-fw pi-circle', 
                            items: [
                                { label: 'Pajak Keluaran', icon: 'pi pi-fw pi-calculator', items: [
                                    { label: 'Input Pajak Keluaran', icon: 'pi pi-fw pi-star-half', routerLink: '/tax/input-pajak-keluaran' }
                                ]},
                                { label: 'Pajak Masukan', icon: 'pi pi-fw pi-calculator', items: [
                                    { label: 'Bahan', icon: 'pi pi-fw pi-star-half', routerLink: '/tax/pajak-masukan-bahan' },
                                    { label: 'Non A/P', icon: 'pi pi-fw pi-star-half', routerLink: '/tax/pajak-masukan-nonap' }
                                ]}
                            ]
                        },
                        // { label: 'Pajak Keluaran', icon: 'pi pi-fw pi-circle', items: [
                        //     { label: 'Input Pajak Keluaran', icon: 'pi pi-fw pi-bookmark', routerLink: '/tax/input-pajak-keluaran' }
                        // ]},
                        // { label: 'Pajak Masukan', icon: 'pi pi-fw pi-circle', items: [
                        //     { label: 'Bahan', icon: 'pi pi-fw pi-bookmark', routerLink: '/tax/pajak-masukan-bahan' },
                        //     { label: 'Non A/P', icon: 'pi pi-fw pi-bookmark', routerLink: '/tax/pajak-masukan-nonap' }
                        // ]}
                    ]}
                ]
            },
            {
                items: [
                    { label: 'General', icon: 'pi pi-gauge', items: [
                        { label: 'Non Trade', icon: 'pi pi-arrow-right-arrow-left', items: [
                            { label: 'Access Nontrade', icon: 'pi pi-user', items: [
                                { label: 'Access TTD', icon: 'pi pi-bookmark', routerLink: '/nontrade/access-nontrade' }
                            ]},
                            { label: 'Orders', icon: 'pi pi-shopping-cart', items: [
                                { label: 'TTD', icon: 'pi pi-bookmark', routerLink: '/nontrade/ttd-nontrade' }
                            ]}
                        ]}
                    ]}
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }
        ];
    }
}
