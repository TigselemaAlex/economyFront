import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../../shared/models/custom-response.model";

@Injectable({
  providedIn: 'root'
})
export class AmortizationService {

  readonly APIUrl = `${environment.API_URL}/public/auth`;
  constructor(private http: HttpClient) { }


  getInstitutions() {
    return this.http.get<CustomResponse>(`${environment.API_URL}/protected/institution/all`);
  }

  getTypeAmortization() {
    return this.http.get<CustomResponse>(`${environment.API_URL}/public/type-amortization`);
  }

  getCredit(institutionid: string) {
    return this.http.get<CustomResponse>(`${environment.API_URL}/protected/credit/credits-charges/${institutionid}`);
  }

  simulateAmortization(request: {amount?: number, term?: number, interestrate?: number, chargesamount?: number}, typeamortization: string) {
    return this.http.post<CustomResponse>(`${environment.API_URL}/public/generate-amortization/${typeamortization}`, request);
  }
}
