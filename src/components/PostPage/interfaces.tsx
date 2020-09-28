import { IMatchParams, IPost, IUser } from "../../interfaces";

export interface IPostPage {
  setIsLoading(isLoading: boolean): void;
  isLoading: boolean;
  user: IUser;
  match: IMatchParams;
}
export interface IContent {
  slug: string;
  isError: boolean;
  post: IPost;
  user: IUser;
  toggleDeleteDialog(toggle: boolean): void;
  showDialog: boolean;
  deletingError: string;
  deletePost(): void;
  favoritePost(slug: string, favorited: boolean): void;
  favoriteError: string;
  isLoading: boolean;
}
