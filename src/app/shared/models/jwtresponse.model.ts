import {User} from "./user.model";

export interface JWTResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}
