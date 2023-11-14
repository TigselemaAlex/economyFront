import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Charge} from "../../../shared/models/charge.model";
import {CustomResponse} from "../../../shared/models/custom-response.model";

@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  readonly APIUrl = `${environment.API_URL}/protected/charges`;
  constructor(private http: HttpClient) { }

  allCharges(idcredit: string) {
    return this.http.get<CustomResponse>(`${this.APIUrl}/all/${idcredit}`);
  }

  saveCharge(idcredit: string, charge: Charge) {
    return this.http.post<CustomResponse>(`${this.APIUrl}/${idcredit}`, charge);
  }
  updateCharge(charge: Charge) {
    return this.http.put<CustomResponse>(`${this.APIUrl}/${charge.id}`, charge);
  }
  deleteCharge(idcharge: string) {
    return this.http.delete<CustomResponse>(`${this.APIUrl}/${idcharge}`);
  }
}
