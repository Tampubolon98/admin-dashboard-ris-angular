import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs";

export interface Representative {
    md?: string;
    id_brand_emp?: string;
}

export interface MasterBrands {
    md?: string;
    detail_brand?: string;
    id_brand_emp?: string;
    nama_supplier?: string;
    user_create?: string;
    date_create?: string;
    representative?: Representative;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: MasterBrands[] | MasterBrands;
}

@Injectable({
    providedIn: 'root'
})
export class MasterBrandService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    getMasterBrand(): Observable<MasterBrands[]> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/master-brand/get-brand`).pipe(
            map(response => {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    getMasterSupplier(): Observable<MasterBrands[]> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/master-brand/get-supplier`).pipe(
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