import { IObject } from "../../../interfaces";

export function logOutUser(state: IObject = {}) {
  let stateCopy = state;
  if (stateCopy) {
    stateCopy = {};
    localStorage.removeItem("user");
    return stateCopy;
  }
  return state;
}

export function setUser(state: IObject, action: IObject) {
  let stateCopy = state;
  if (action.user) {
    stateCopy = action.user;
    localStorage.setItem("user", JSON.stringify(action.user));
  }
  return stateCopy;
}
