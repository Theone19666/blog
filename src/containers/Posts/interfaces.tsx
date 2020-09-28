import { IPost, IUser } from "../../interfaces";

interface IPageCost {
  from: number;
  to: number;
}
export interface IPageCosts {
  [key: string]: IPageCost;
}

export interface IPosts {
  posts: IPost[];
  fetchPostsList(): void;
  isLoading: boolean;
  isError: boolean;
  user: IUser;
  updatePost(article: string, index: number): void;
}
