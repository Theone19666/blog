import { IUser } from "../../interfaces";

export interface IEditProfile {
  setIsLoading(isLoadinf: boolean): void;
  setUser(user: IUser): void;
  user: IUser;
  isLoading: boolean;
}
