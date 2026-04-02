import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs";

export interface Representative {
    company_code ?: string;
}

export interface MasterKeluaran {
    company_code: string;
    outlet_code: string;
    customer_id: string;
    agreement_no: string;
    invoice_no: string;
    invoice_date: string;
    type_date: string;
    inv_tax_date: string;
    tax_series_no: string;
    dpp: number;
    ppn: number;
    pph23: number;
    after_tax: number;
    flag_print: string;
    process_tax_out: string;
    user_create: string;
    date_create: string;
    user_modified: string;
    date_modified: string;
    npwp: string;
    name: string;
    address: string;
    city_nm: string;
    postcode: string;
    curr_code: string;
    kurs_rate: string;
    tr_code: string;
    remark: string;
    pph23_auto: string;
    status_ap: string;
    RELEASE: string;
    tgl_input: string;
    npwp_potong: string;
    kwitansi_no: string;
    representative: Representative;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: MasterKeluaran[] | MasterKeluaran;
}

@Injectable({
    providedIn: 'root'
})
export class MasterKeluaranService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    createMasterKeluaran(createData: any):Observable<MasterKeluaran[]> {
        return this.http.post<any>(`${this.apiUrl}/tax-keluaran/post`, createData)
    }
}