import { logOutUser, loginUser } from "../store/actions/userActions";

import App from "../containers/App";
import { IObject } from "../interfaces";
import { connect } from "react-redux";
import { setIsLoading } from "../store/actions/postsActions";

const mapStateToProps = (state: IObject) => {
  return {
    isLoading: state.posts.isLoading,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  loginUser: (user: IObject) => dispatch(loginUser(user)),
  logoutUser: () => dispatch(logOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
