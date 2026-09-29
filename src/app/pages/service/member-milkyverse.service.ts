import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Representative {
    id_kasbon?: string;
    id_batch?: string;
}

export interface MemberMilkyverse {
    id_kasbon?: string;
    nominal_transfer?: string;
    tanggal_transfer?: string;
    id_batch?: string;
    status?: string;
    po_no?: string;
    invoice_no?: string;
    rcv_no?: string;
    create_by?: string;
    create_date?: string;
    representative?: Representative;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: MemberMilkyverse[] | MemberMilkyverse;
}

@Injectable({
    providedIn: 'root'
})
export class MemberMilkyverseService {
    private apiurl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    getMemberPembayaran(): Observable<MemberMilkyverse[]> {
        return this.http.get<ApiResponse>(`${this.apiurl}/member/get-pembayaran`).pipe(
            map(response => {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }
}