import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Representative {
    nama?: string;
    image_employee?: string;
}

export interface MasterEmployees {
    id_employee?: string;
    nama?: string;
    kode_toko?: string;
    no_handphone?: string;
    tanggal_masuk?: string;
    no_kk?: string;
    no_ktp?: string;
    jenis_kelamin?: string;
    status?: string;
    alamat_rumah?: string;
    keterangan?: string;
    tanggal_keluar?: string;
    status_aktif?: string;
    user_terminate?: string;
    date_terminate?: string;
    kategori_karyawan?: string;
    md_emp?: string;
    brand_emp?: string;
    tanggal_selesai?: string;
    user_create?: string;
    date_create?: string;
    supplier?: string;
    representative?: Representative;
}

// Interface untuk response API
export interface ApiResponse {
    success: boolean;
    message: string;
    data: MasterEmployees[] | MasterEmployees;
}

@Injectable({
  providedIn: 'root'
})
export class MasterEmployeeService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getMasterEmployee(): Observable<MasterEmployees[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/master-employee/get-employee`).pipe(
      map(response => {
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      })
    );
  }

  getEmployeeSPG(): Observable<MasterEmployees[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/master-employee/get-spg`).pipe(
      map(response => {
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      })
    );
  }

  getEmployeePKL(): Observable<MasterEmployees[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/master-employee/get-pkl`).pipe(
      map(response => {
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      })
    );
  }

  getEmployeeTerminate(): Observable<MasterEmployees[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/master-terminate/get-terminate`).pipe(
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