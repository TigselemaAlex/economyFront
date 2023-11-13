import {CanActivateFn, Router} from '@angular/router';
import {JWTResponse} from "../../shared/models/jwtresponse.model";
import {inject} from "@angular/core";


export const loginGuard: CanActivateFn = (route, state) => {
  const jwt: JWTResponse = JSON.parse(localStorage.getItem('token') as string);
  if(jwt){
    return true;
  }else{
    inject(Router).navigate(['/login']);
    return false;
  }
};
