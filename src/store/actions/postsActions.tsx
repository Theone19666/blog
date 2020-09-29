import { IPost } from "../../interfaces";
import PostService from "../../services/postService";

export const fetchPostsList = () => {
  return function (dispatch: Function) {
    dispatch(setIsLoading(true));
    return PostService.getAllPosts()
      .then(
        (json) => {
          if (typeof json !== "object") {
            return json;
          }
          dispatch(setPostsList(json.articles));
          dispatch(setIsLoading(false));
        },
        (error) => {
          console.log("An error occurred.", error);
          dispatch(setIsLoading(false));
          dispatch(setIsError(true));
          return error;
        }
      )
      .catch((error) => {
        dispatch(setIsLoading(false));
        dispatch(setIsError(true));
        throw new Error(error);
      });
  };
};

export const setPostsList = (payload: IPost[] = []) => {
  return {
    type: "SET_POSTS_LIST",
    list: payload,
  };
};
export const setIsLoading = (payload: Boolean) => {
  return {
    type: "SET_IS_LOADING",
    isLoading: payload,
  };
};
export const setIsError = (payload: Boolean) => {
  return {
    type: "SET_IS_ERROR",
    isError: payload,
  };
};
export const updatePost = (updatedPostInfo: {}, index: number) => {
  return {
    type: "UPDATE_POST",
    updatedPostInfo,
    index,
  };
};
