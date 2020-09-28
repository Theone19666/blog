import { IUser } from "../../interfaces";

export interface IPost {
  author: IUser;
  createdAt: string;
  tagList: string[];
  favoritesCount: number;
  favorited: boolean;
  description: string;
  title: string;
  classNamesList: string;
  slug: string;
  error: string;
  onFavoriteIconClick: () => void;
  body?: string;
  updatedAt: string;
}
