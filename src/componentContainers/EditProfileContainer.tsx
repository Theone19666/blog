import { loginUser, setUser } from "../store/actions/userActions";

import EditProfile from "../containers/EditProfile";
import { IObject } from "../interfaces";
import { connect } from "react-redux";
import { setIsLoading } from "../store/actions/postsActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: IObject) => {
  return {
    user: state.user,
    isLoading: state.posts.isLoading
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  loginUser: (user: IObject) => dispatch(loginUser(user)),
  setUser: (user: IObject) => dispatch(setUser(user)),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProfile)
);
