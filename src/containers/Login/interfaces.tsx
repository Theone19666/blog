import { IUser } from "../../interfaces";

export interface ILogin {
  setIsLoading(isLoading: boolean): void;
  setUser(user: IUser): void;
}
