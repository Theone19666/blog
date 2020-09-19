import { IObject } from "../../interfaces";

function logOutUser(state: IObject = {}) {
  //   const stateCopy = JSON.parse(JSON.stringify(state));
  let stateCopy = state;
  if (stateCopy) {
    // delete stateCopy.user;
    stateCopy = {};
    localStorage.removeItem("user");
    return stateCopy;
  }
  return state;
}

function setUser(state: IObject, action: IObject) {
  //const stateCopy = JSON.parse(JSON.stringify(state));
  let stateCopy = state;
  if (action.user) {
    stateCopy = action.user;
    localStorage.setItem("user", JSON.stringify(action.user));
  }

  return stateCopy;
}

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
