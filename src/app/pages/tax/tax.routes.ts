import { Routes } from "@angular/router";
import { InputPajakKeluaran } from "./input-pajak-keluaran";
import { PajakMasukanBahan } from "./pajak-masukan-bahan";
import { PajakMasukanNonAP } from "./pajak-masukan-nonap";

export default [
    {path: 'input-pajak-keluaran', data: {breadcrumb: 'Input'}, component: InputPajakKeluaran},
    {path: 'pajak-masukan-bahan', data: {breadcrumb: 'Input'}, component: PajakMasukanBahan},
    {path: 'pajak-masukan-nonap', data: {breadcrumb: 'Input'}, component: PajakMasukanNonAP}
] as Routes;