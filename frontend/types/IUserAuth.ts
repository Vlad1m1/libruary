import { ITokens } from "./ITokens";
export interface IUserAuth extends ITokens {
  id: string;
  login: string;
}
