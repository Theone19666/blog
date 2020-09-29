import { IObject } from "../../interfaces";
import PostService from "../../services/postService";

export const favoritePost = (
  slug: string,
  favorited: boolean,
  index: number,
  token: string,
  history: IObject,
  setError: Function,
  updatePost: Function
) => {
  if (!token) {
    history.push({
      pathname: "/sign-in",
    });
    return;
  }
  let action: any;
  if (favorited) {
    action = PostService.unfavoritePost(slug, token);
  } else {
    action = PostService.favoritePost(slug, token);
  }
  action.then((resp: any) => {
    if (resp?.errors) {
      const keyError = Object.keys(resp.errors)[0];
      const errorMessage = `${keyError} ${
        resp.errors[Object.keys(resp.errors)[0]]
      }`;
      setError({ message: errorMessage, slug });
      setTimeout(() => setError({}), 5000);
      return;
    }
    updatePost(resp.article, index);
  });
};
