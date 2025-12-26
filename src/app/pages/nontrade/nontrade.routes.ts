import { Routes } from "@angular/router";
import { AccessNontrade } from "./access-nontrade";
import { TTDNontrade } from "./ttd-nontrade";

export default [
    {path: 'access-nontrade', data: {breadcrumb: 'Input'}, component: AccessNontrade},
    {path: 'ttd-nontrade', data: {breadcrumb: 'Input'}, component: TTDNontrade},
] as Routes;