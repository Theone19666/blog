import { IObject } from "../interfaces";
import Registration from "../containers/Registration";
import { connect } from "react-redux";
import { registerUser } from "../store/actions/registerActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: IObject) => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => ({
  registerUser: (user: IObject) => dispatch(registerUser(user)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Registration)
);
