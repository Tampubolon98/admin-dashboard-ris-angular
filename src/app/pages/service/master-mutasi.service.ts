import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs";

export interface Representative {
    id_employee?: string;
}

export interface MasterMutasi {
    id_employee?: string;
    nama?: string;
    tanggal_masuk?: string;
    tanggal_keluar?: string;
    kategori_karyawan?: string;
    kode_toko?: string;
    md_emp?: string;
    brand_emp?: string;
    supplier?: string;
    no_kk?: string;
    no_ktp?: string;
    nama_toko?: string;
    user_create?: string;
    date_create?: string;
    representative?: Representative;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: MasterMutasi[] | MasterMutasi;
}

@Injectable({
    providedIn: 'root'
})
export class MasterMutasiService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    getMasterMutasi(): Observable<MasterMutasi[]> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/master-mutasi/get-mutasi`).pipe(
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