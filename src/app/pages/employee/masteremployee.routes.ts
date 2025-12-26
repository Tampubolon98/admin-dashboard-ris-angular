import { Routes } from "@angular/router";
import { MasterEmployee } from "./master-employee";
import { MasterBrand } from "./master-brand";
import { MutasiEmployee } from "./mutasi-employee";
import { RehireEmployee } from "./rehire-employee";
import { TerminateEmployee } from "./terminate-employee";
import { ReportCV } from "./report-cv";
import { ReportEmployee } from "./report-employee";
import { ReportSalesID } from "./report-sales-id";

export default [
    {path: 'data-karyawan', data: {breadcrumb: 'Table'}, component: MasterEmployee},
    {path: 'master-brand', data: {breadcrumb: 'Table'}, component: MasterBrand},
    {path: 'mutasi-employee', data: {breadcrumb: 'Table'}, component: MutasiEmployee},
    {path: 'rehire-employee', data: {breadcrumb: 'Modal'}, component: RehireEmployee},
    {path: 'terminate-employee', data: {breadcrumb: 'Table'}, component: TerminateEmployee},
    {path: 'report-cv', data: {breadcrumb: 'File'}, component: ReportCV},
    {path: 'report-employee', data: {breadcrumb: 'File'}, component: ReportEmployee},
    {path: 'report-sales-id', data: {breadcrumb: 'File'}, component: ReportSalesID}
] as Routes;