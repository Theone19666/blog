import { IObject } from "../../interfaces";
import Service from "../../services/service";
import { setIsLoading } from "./postsActions";

export const registerUser = (userInfo: IObject) => {
  return function (dispatch: Function) {
    dispatch(setIsLoading(true));
    return Service.getAllPosts()
      .then(
        (json) => {
          if (typeof json !== "object") {
            return json;
          }
          // dispatch(setPostsList(json.articles));
          dispatch(setIsLoading(false));
        },
        (error) => {
          console.log("An error occurred.", error);
          dispatch(setIsLoading(false));
          // dispatch(setIsError(true));
          return error;
        }
      )
      .catch((error) => {
        dispatch(setIsLoading(false));
        // dispatch(setIsError(true));
        throw new Error(error);
      });
  };
};

export const setUser = (user: IObject = {}) => {
  return {
    type: "SET_POSTS_LIST",
    user,
  };
};
export const deleteUser = () => {
  return {
    type: "LOG_IN_USER",
  };
};
