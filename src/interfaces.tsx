export interface IObject {
  [key: string]: any;
}
export interface IUser {
  bio: string;
  createdAt: string;
  email: string;
  id: number;
  image: string;
  token: string;
  updatedAt: string;
  username: string;
}
export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export interface IPost {
  author: IAuthor;
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  description: string;
  user: string;
  favorited: boolean;
  favoritesCount: number;
}
export interface IPostState {
  isLoading: boolean;
  isError: boolean;
  posts: IPost[];
}
export interface IState {
  posts: IPostState;
  user: IUser;
}
export interface IMatchParams {
  slug: string;
  params: IObject;
}
