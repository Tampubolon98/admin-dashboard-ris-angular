import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Representative {
    id_kasbon?: string;
    id_batch?: string;
}

export interface MemberMilkyverse {
    id_kasbon: string;
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

export interface DetailPembayaranResponse {
    data: MemberMilkyverse[];
    total_nominal: number;
}

export interface ApiResponseDtl {
    success: boolean;
    message: string;
    total_nominal: number;
    data: MemberMilkyverse[] | MemberMilkyverse;
}

@Injectable({
    providedIn: 'root'
})
export class MemberMilkyverseService {
    private apiurl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    getMemberPembayaran(id_batch: string | null, status: string | null, start_date: string | null, end_date: string | null): Observable<MemberMilkyverse[]> {
        let params = new HttpParams();

        if (id_batch) {
            params = params.set('id_batch', id_batch);
        }

        if (status) {
            params = params.set('status', status);
        }

        if (start_date) {
            params = params.set('start_date', start_date);
        }

        if (end_date) {
            params = params.set('end_date', end_date);
        }
        
        return this.http.get<ApiResponse>(`${this.apiurl}/member/get-pembayaran`, {params}).pipe(
            map(response => {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    getDetailMemberPembayaran(id_batch: string | null):Observable<DetailPembayaranResponse> {
        let params = new HttpParams()

        if (id_batch) {
            params = params.set('id_batch', id_batch);
        }

        return this.http.get<ApiResponseDtl>(`${this.apiurl}/member/get-detail-pembayaran`, {params}).pipe(
            map(response => ({
                data: Array.isArray(response.data)
                    ? response.data
                    : [],
                total_nominal: response.total_nominal
            }))
        );
    }
}