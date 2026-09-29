import { Routes } from "@angular/router";
import { TransaksiKartuMember } from "./transaksi-kartu-member";
import { VerifikasiPembayaranMember } from "./verifikasi-pembayaran-member";

export default [
    {
        path: 'index-transaksi', 
        data: {
            breadcrumb: 'table'
        },
        component: TransaksiKartuMember
    },
    {
        path: 'index-verifikasi', 
        data: {
            breadcrumb: 'table'
        },
        component: VerifikasiPembayaranMember
    }
] as Routes;