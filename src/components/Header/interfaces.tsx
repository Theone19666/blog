import { IUser } from "../../interfaces";

export interface IHeader {
  user: IUser;
  logoutUser(): void;
}
