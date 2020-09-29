import { IObject, IPost } from "../../../interfaces";

export default function postsReducer(state: IObject = {}, action: IObject) {
  switch (action.type) {
    case "SET_POSTS_LIST":
      return { ...state, posts: action.list };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_IS_ERROR":
      return { ...state, isError: action.isError };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((item: IPost, index: number) => {
          if (index === action.index) {
            return action.updatedPostInfo;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
