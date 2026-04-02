import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs";

export interface Representative {
    faktur_rmy ?: string;
}

export interface MasterMasukan {
    kode?: string;
    faktur_rmy: string;
    supplier_code?: string;
    supplier_name?: string;
    status_ap?: string;
    dpp?: number;
    ppn?: number;
    no_seri?: string;
    npwp?: string;
    RELEASE?: string;
    pay_date?: string;
    tgl_faktur?: string;
    tax_date?: string;
    user_create?: string;
    date_create?: string;
    user_modified?: string;
    date_modified?: string;
    representative?: Representative;
}

export interface Supplier {
    supplier_code?: string;
    supplier_name?: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: MasterMasukan[] | MasterMasukan;
}

@Injectable({
    providedIn: 'root'
})
export class MasterMasukanService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    // REST API untuk tax bahan
    getMasterMasukanBahan(startDate: string, endDate: string): Observable<MasterMasukan[]> {
        const params = new HttpParams().set('start_date', startDate).set('end_date', endDate);

        return this.http.get<ApiResponse>(`${this.apiUrl}/tax-bahan/get-bahan`, {params}).pipe(
            map(response => {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    updateMasterMasukanBahan(faktur_rmy: string, updateData: any):Observable<MasterMasukan[]> {
        return this.http.put<any>(`${this.apiUrl}/tax-bahan/update/${faktur_rmy}`, updateData)
    }
    // end REST API untuk tax bahan

    // REST API untuk tax non ap
    getMasterMasukanNonap(startDate: string, endDate: string):Observable<MasterMasukan[]> {
        const params = new HttpParams().set('start_date', startDate).set('end_date', endDate);

        return this.http.get<ApiResponse>(`${this.apiUrl}/tax-nonap/get-nonap`, {params}).pipe(
            map(response => {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    getSupplier(): Observable<Supplier[]> {
        return this.http
            .get<any>(`${this.apiUrl}/supplier/get-supplier`)
            .pipe(
                map(res => res.data)
            );
    }

    createMasterMasukanNonap(createData: any):Observable<MasterMasukan[]> {
        return this.http.post<any>(`${this.apiUrl}/tax-nonap/post`, createData)
    }

    updateMasterMasukanNonap(faktur_rmy: string, updateData: any):Observable<MasterMasukan[]> {
        return this.http.put<any>(`${this.apiUrl}/tax-nonap/update/${faktur_rmy}`, updateData)
    }
    // end REST API untuk tax non ap
}