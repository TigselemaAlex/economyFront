import {Institution} from "./institution.model";

export interface User {
  id?: string;
  identification: string;
  fullname: string;
  email: string;
  telephone: string;
  status: boolean;
  authorities: {
    authority: string;
  }[];
  institution: Institution
}
