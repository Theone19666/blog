import { IObject } from "../../interfaces";

export const registerUser = (user: IObject = {}) => {
  return {
    type: "REGISTER_USER",
    user,
  };
};
