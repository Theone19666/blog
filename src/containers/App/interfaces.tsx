import { IUser } from "../../interfaces";

export interface IApp {
  isLoading: boolean;
  loginUser(user: IUser): void;
  logoutUser(): void;
  user: IUser;
}

export interface IAppState {
  isLoading: boolean;
  user: IUser;
}
