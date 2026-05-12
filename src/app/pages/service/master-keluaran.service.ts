import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
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

    getMasterKeluaran(startDate: string, endDate: string, invoiceno: string, suppliercode: string, trcode: string):Observable<MasterKeluaran[]> {
        const params = new HttpParams().set('start_date', startDate).set('end_date', endDate).set('invoice_no', invoiceno).set('customer_id', suppliercode).set('tr_code', trcode);

        return this.http.get<ApiResponse>(`${this.apiUrl}/tax-keluaran/get`, {params}).pipe(map(response => {
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                return [];
            }
        }));
    }

    createMasterKeluaran(startDate: string, endDate: string, invoiceno: string, suppliercode: string, trcode: string, storecode: string):Observable<MasterKeluaran[]> {
        const params = new HttpParams().set('start_date', startDate).set('end_date', endDate).set('invoice_no', invoiceno).set('customer_id', suppliercode).set('tr_code', trcode).set('outlet_code', storecode);

        return this.http.post<any>(`${this.apiUrl}/tax-keluaran/post`, null, {params});
    }
}