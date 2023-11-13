import {Role} from "../enums/Role";

export interface UserRequest {
  identification: string;
  fullname:string;
  email: string;
  password: string;
  name: string;
  telephone: string;
  address: string;
  role: Role;
}
