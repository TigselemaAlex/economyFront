import {Credit} from "./credit.model";

export interface Institution {
  id?: string;
  name: string;
  logo?: File;
  credits?: Credit[];
}

