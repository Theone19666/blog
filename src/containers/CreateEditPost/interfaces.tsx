import { IUser } from "../../interfaces";

export interface ICreatedEditPost {
  setIsLoading(isLoading: boolean): void;
  user: IUser;
  isLoading: boolean;
  slug: string;
}
