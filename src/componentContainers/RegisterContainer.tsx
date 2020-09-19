import {
  logOutUser,
  loginUser,
  setUser,
} from "../store/actions/userActions";

import { IObject } from "../interfaces";
import Registration from "../containers/Registration";
import { connect } from "react-redux";
import { setIsLoading } from "../store/actions/postsActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: IObject) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  //registerUser: (user: IObject) => dispatch(registerUser(user)),
  loginUser: (user: IObject) => dispatch(loginUser(user)),
  setUser: (user: IObject) => dispatch(setUser(user)),
  logOutUser: () => dispatch(logOutUser()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Registration)
);
