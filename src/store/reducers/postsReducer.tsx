import { IObject } from "../../interfaces";

export default function postsReducer(state: IObject[] = [], action: IObject) {
  switch (action.type) {
    case "SET_POSTS_LIST":
      return [...state, ...action.list];
    default:
      return state;
  }
}
