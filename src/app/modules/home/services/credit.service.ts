import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../../../shared/models/custom-response.model";
import {Observable} from "rxjs";
import {Credit} from "../../../shared/models/credit.model";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  readonly APIUrl = `${environment.API_URL}/protected/credit`;
  constructor(private http: HttpClient) { }

  getAllCredits(institutionid: string) {
    return this.http.get<CustomResponse>(`${this.APIUrl}/all/${institutionid}`);
  }

  saveCredit(institutionid: string,credit: Credit) {
    return this.http.post<CustomResponse>(`${this.APIUrl}/${institutionid}`, credit);
  }

  updateCredit(credit: Credit) {
    return this.http.put<CustomResponse>(`${this.APIUrl}/${credit.id}`, credit);
  }

  deleteCredit(idcredit: string) {
    return this.http.delete<CustomResponse>(`${this.APIUrl}/${idcredit}`);
  }
}
