import { IObject } from "../../interfaces";

function logOutUser(state: IObject = {}) {
  const stateCopy = JSON.parse(JSON.stringify(state));
  if (stateCopy.user) {
    delete stateCopy.user;
    localStorage.removeItem("user");
    return stateCopy;
  }
  return state;
}

function logInUser(state: IObject, action: IObject) {
  const stateCopy = JSON.parse(JSON.stringify(state));
  if (action.user) {
    stateCopy.user = action.user;
    localStorage.setItem("user", JSON.stringify(action.user));
  }

  return stateCopy;
}

export default function postsReducer(state: IObject = {}, action: IObject) {
  switch (action.type) {
    case "LOG_IN_USER":
      return logInUser(state, action);
    case "LOG_OUT_USER":
      return logOutUser(state);
    default:
      return state;
  }
}
