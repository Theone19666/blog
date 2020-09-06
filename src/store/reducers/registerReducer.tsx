import { IObject } from "../../interfaces";

export default function registerReducer(state: IObject = {}, action: IObject) {
  switch (action.type) {
    case "REGISTER_USER":
      return { ...state, [action.user.username]: action.user };
    default:
      return state;
  }
}
