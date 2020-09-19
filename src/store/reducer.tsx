import { combineReducers } from "redux";
import postsReducer from "./reducers/postsReducer";
import userReducer from "./reducers/userReducer";

export default combineReducers({
  posts: postsReducer,
  user: userReducer,
});
