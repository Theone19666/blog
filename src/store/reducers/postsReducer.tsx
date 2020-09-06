import { IObject } from "../../interfaces";

export default function postsReducer(state: IObject = {}, action: IObject) {
  switch (action.type) {
    case "SET_POSTS_LIST":
      return { ...state, posts: action.list };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_IS_ERROR":
      return { ...state, isError: action.isError };
    default:
      return state;
  }
}
