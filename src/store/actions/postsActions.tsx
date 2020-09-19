import { IObject } from "../../interfaces";
import Service from "../../services/service";

export const fetchPostsList = () => {
  return function (dispatch: Function) {
    dispatch(setIsLoading(true));
    return Service.getAllPosts()
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

export const setPostsList = (list: IObject[] = []) => {
  return {
    type: "SET_POSTS_LIST",
    list,
  };
};
export const setIsLoading = (isLoading: Boolean) => {
  return {
    type: "SET_IS_LOADING",
    isLoading,
  };
};
export const setIsError = (isError: Boolean) => {
  return {
    type: "SET_IS_ERROR",
    isError,
  };
};
export const updatePost = (updatedPostInfo: {}, index: number) => {
  return {
    type: "UPDATE_POST",
    updatedPostInfo,
    index,
  };
};
