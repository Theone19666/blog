import { IUser } from "../../interfaces";

export const setUser = (payload: IUser) => {
  return {
    type: "SET_USER",
    user: payload,
  };
};
export const loginUser = (payload: IUser) => {
  return {
    type: "LOG_IN_USER",
    user: payload,
  };
};
export const logOutUser = () => {
  return {
    type: "LOG_OUT_USER",
  };
};
