import { combineReducers } from "redux";
import postsReducer from "./reducers/postsReducer";
import registerReducer from "./reducers/registerReducer";

export default combineReducers({
  posts: postsReducer,
  users: registerReducer,
});
