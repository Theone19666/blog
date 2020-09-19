import { IObject } from "../../interfaces";
import Service from "../../services/service";
import { setIsLoading } from "./postsActions";

/*export const registerUser = (body: IObject) => {
  return function (dispatch: Function) {
    // dispatch(setIsLoading(true));
    return Service.registerUser(body)
      .then(
        (json) => {
          return json;
        },
        (error) => {
          console.log("An error occurred.", error);
          return error;
        }
      )
      .catch((error) => {
        // dispatch(setIsError(true));
        throw new Error(error);
      })
      .finally(() => {
        //  dispatch(setIsLoading(false));
      });
  };
};

export const loginUser = (body: IObject) => {
  return function (dispatch: Function) {
    //dispatch(setIsLoading(true));
    return Service.loginUser(body)
      .then(
        (json) => {
          return json;
        },
        (error) => {
          console.log("An error occurred.", error);
          return error;
        }
      )
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        // dispatch(setIsLoading(false));
      });
  };
}; */

export const setUser = (user: IObject = {}) => {
  return {
    type: "SET_USER",
    user,
  };
};
export const loginUser = (user: IObject = {}) => {
  return {
    type: "LOG_IN_USER",
    user,
  };
};
export const logOutUser = () => {
  return {
    type: "LOG_OUT_USER",
  };
};
