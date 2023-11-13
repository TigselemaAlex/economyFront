import {Charge} from "./charge.model";

export interface Credit {
  id?: string;
  name: string;
  minimumamount: number;
  maximumamount: number;
  interestrate: number;
  indirectCharges?: Charge[];
}

