import { logOutUser, setUser } from "./utils";

import { IObject } from "../../../interfaces";

export default function postsReducer(state: IObject = {}, action: IObject) {
  switch (action.type) {
    case "SET_USER":
      return setUser(state, action);
    case "LOG_IN_USER":
      return action.user;
    case "LOG_OUT_USER":
      return logOutUser(state);
    default:
      return state;
  }
}
