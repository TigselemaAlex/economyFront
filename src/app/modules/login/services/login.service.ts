import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserRequest} from "../../../shared/models/user-request.model";
import {CustomResponse} from "../../../shared/models/custom-response.model";
import {LoginRequest} from "../../../shared/models/login-request.model";
import {JWTResponse} from "../../../shared/models/jwtresponse.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly APIUrl = `${environment.API_URL}/public/auth`;
  constructor(private http: HttpClient) {

  }

  registerUser(user: UserRequest) {
    return this.http.post<CustomResponse>( `${this.APIUrl}/logup`, user);
  }

  loginUser(user: LoginRequest) {
    return this.http.post<JWTResponse>( `${this.APIUrl}/login`, user);
  }
}
