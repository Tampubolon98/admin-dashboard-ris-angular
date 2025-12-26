import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt" height="496.000000pt" viewBox="0 0 512.000000 496.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,496.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                        <path d="M525 4701 c-49 -23 -88 -63 -112 -116 -17 -38 -18 -137 -20 -2050 -1
                        -1269 1 -2028 7 -2060 14 -67 50 -118 107 -152 l48 -28 2001 0 2001 0 48 30
                        c36 22 57 45 77 84 l28 53 0 2035 c0 1496 -3 2046 -11 2074 -16 52 -61 103
                        -112 128 l-43 21 -1990 0 c-1915 0 -1990 -1 -2029 -19z m3690 -436 l25 -24 0
                        -1420 0 -1420 -24 -28 -24 -28 -459 -3 c-576 -4 -666 5 -832 84 -350 165 -517
                        528 -397 860 34 93 78 160 178 271 173 192 215 290 174 405 -51 142 -206 205
                        -487 196 -102 -3 -112 -5 -130 -27 -18 -22 -19 -52 -19 -878 l0 -854 -25 -24
                        -24 -25 -626 0 -626 0 -24 25 -25 24 0 1421 0 1421 25 24 24 25 1636 0 1636 0
                        24 -25z m-3012 -3199 c48 -20 87 -70 87 -112 0 -38 -19 -83 -45 -104 -14 -12
                        -14 -14 4 -27 35 -24 53 -131 31 -174 -9 -15 -22 -19 -63 -19 -29 0 -58 5 -65
                        12 -7 7 -12 32 -12 56 0 66 -13 82 -65 82 l-45 0 0 -56 c0 -83 -9 -94 -78 -94
                        -32 0 -63 5 -70 12 -13 13 -18 391 -6 422 5 14 28 16 150 16 100 0 155 -4 177
                        -14z m427 -109 c55 -19 70 -60 70 -193 0 -72 -4 -114 -12 -122 -15 -15 -100
                        -16 -116 0 -8 8 -15 8 -26 -2 -9 -7 -44 -15 -79 -17 -57 -5 -65 -3 -94 21 -37
                        31 -52 84 -35 121 17 38 56 57 133 65 72 8 97 19 85 39 -10 16 -62 13 -76 -4
                        -16 -20 -103 -20 -119 -1 -12 14 -9 25 17 64 25 37 177 54 252 29z m416 -12
                        l25 -25 37 25 c69 47 150 27 187 -45 19 -37 21 -240 3 -258 -7 -7 -33 -12 -58
                        -12 -25 0 -51 5 -58 12 -7 7 -12 45 -12 99 0 91 -10 114 -47 107 -15 -3 -19
                        -17 -23 -98 -3 -52 -9 -101 -13 -107 -5 -8 -30 -13 -62 -13 -32 0 -57 5 -62
                        13 -4 6 -10 55 -13 107 -4 81 -8 95 -23 98 -37 7 -47 -16 -47 -107 0 -54 -5
                        -92 -12 -99 -16 -16 -100 -16 -116 0 -8 8 -12 57 -12 153 0 96 4 145 12 153
                        17 17 93 15 108 -2 10 -13 16 -12 43 5 47 28 111 25 143 -6z m589 11 c54 -23
                        68 -54 73 -169 2 -60 -1 -113 -7 -129 -10 -26 -15 -28 -66 -28 -40 0 -55 4
                        -55 14 0 11 -8 10 -37 -6 -57 -29 -148 -21 -180 16 -25 29 -31 91 -13 125 12
                        23 80 51 125 51 45 0 85 16 85 35 0 20 -53 20 -70 0 -13 -15 -83 -21 -114 -9
                        -38 15 2 87 57 103 50 14 164 13 202 -3z m235 -68 c14 -42 28 -79 31 -82 3 -3
                        13 27 23 68 9 40 22 78 28 84 14 14 114 16 122 3 7 -11 -108 -345 -131 -379
                        -20 -33 -76 -54 -131 -50 -41 3 -48 6 -56 31 -12 34 1 61 33 65 12 2 25 10 28
                        18 3 7 -18 77 -46 155 -29 78 -50 148 -47 156 4 10 21 13 63 11 l58 -3 25 -77z
                        m500 69 c55 -19 70 -60 70 -193 0 -72 -4 -114 -12 -122 -18 -18 -107 -16 -115
                        3 -5 14 -7 14 -23 0 -11 -10 -44 -19 -77 -22 -79 -7 -118 12 -134 68 -23 77
                        20 129 113 136 64 5 110 22 105 37 -6 18 -62 19 -77 2 -16 -21 -103 -22 -119
                        -2 -10 11 -9 21 4 45 8 17 17 31 18 31 1 0 20 7 42 15 48 17 157 18 205 2z
                        m430 -16 c14 -10 30 -33 37 -52 16 -46 17 -220 1 -242 -14 -18 -94 -27 -116
                        -13 -8 5 -12 40 -12 99 0 51 -4 98 -9 105 -5 8 -21 12 -37 10 l-29 -3 -3 -85
                        c-3 -135 -2 -131 -75 -128 l-62 3 -3 149 c-2 101 1 153 9 162 18 22 86 18 101
                        -5 9 -15 16 -17 25 -9 24 20 88 37 118 32 17 -3 41 -13 55 -23z m363 18 c63
                        -17 77 -52 77 -190 0 -76 -4 -119 -12 -127 -15 -15 -100 -16 -116 0 -8 8 -15
                        8 -26 -2 -9 -7 -44 -15 -79 -17 -57 -5 -65 -3 -94 21 -54 46 -53 126 2 162 14
                        9 57 20 96 24 72 8 97 19 85 39 -10 16 -62 13 -76 -4 -16 -20 -103 -20 -119
                        -1 -12 14 -9 25 17 64 24 36 164 54 245 31z"/>
                        <path d="M1376 3831 c-15 -17 -17 -94 -16 -1012 0 -982 1 -994 20 -1014 19
                        -18 34 -20 164 -20 127 0 146 2 165 19 l21 19 0 808 c0 571 3 815 11 832 22
                        48 22 48 574 44 499 -3 523 -4 605 -26 127 -33 224 -85 301 -161 111 -109 154
                        -231 148 -412 -4 -85 -8 -101 -43 -174 -34 -70 -56 -96 -197 -235 -189 -185
                        -213 -225 -213 -349 0 -61 6 -87 28 -135 30 -67 90 -134 151 -169 83 -49 131
                        -56 382 -56 220 0 234 1 253 20 20 20 20 33 20 1014 l0 995 -22 15 c-20 14
                        -148 16 -1179 16 -1114 0 -1157 -1 -1173 -19z"/>
                        <path d="M1030 931 l0 -41 43 0 c46 0 67 13 67 41 0 23 -11 29 -65 35 l-45 5
                        0 -40z"/>
                        <path d="M1492 749 c-32 -12 -25 -43 10 -47 18 -2 31 4 42 20 9 12 16 26 16
                        30 0 11 -39 9 -68 -3z"/>
                        <path d="M2502 749 c-15 -5 -22 -16 -20 -26 5 -25 49 -29 65 -7 29 39 8 55
                        -45 33z"/>
                        <path d="M3255 756 c-29 -9 -40 -17 -40 -31 0 -16 7 -20 30 -20 23 0 33 7 43
                        28 8 16 12 30 10 31 -1 2 -21 -2 -43 -8z"/>
                        <path d="M4030 742 c-27 -22 -19 -42 15 -42 21 0 55 32 55 52 0 15 -48 8 -70
                        -10z"/>
                    </g>
                </svg>
                <span>Ramayana</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
