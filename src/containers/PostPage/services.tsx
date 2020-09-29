import { IObject } from "../../interfaces";
import PostService from "../../services/postService";

export const deletePost = (
  token: string,
  slug: string,
  history: IObject,
  setIsLoading: Function,
  setDeletingError: Function,
  setShowDialog: Function
) => {
  if (!token) {
    history.push({
      pathname: "/sign-in",
    });
    return;
  }
  if (!slug) return;
  setIsLoading(true);
  PostService.deletePost(slug, token)
    .then((resp: any) => {
      if (resp?.errors) {
        const keyError = Object.keys(resp.errors)[0];
        const errorMessage = `${keyError} ${
          resp.errors[Object.keys(resp.errors)[0]]
        }`;
        setDeletingError(errorMessage);
        setTimeout(() => setDeletingError(""), 5000);
        return;
      }
      history.push({
        pathname: "/articles",
      });
      return;
    })
    .catch((error) => {
      setDeletingError(error);
    })
    .finally(() => {
      setIsLoading(false);
      setShowDialog(false);
    });
};

export const favoritePost = (
  slug: string,
  favorited: boolean,
  token: string,
  history: IObject,
  setFavoriteError: Function,
  setPost: Function
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
      setFavoriteError(errorMessage);
      setTimeout(() => setFavoriteError(""), 5000);
      return;
    }
    setPost(resp.article);
  });
};
