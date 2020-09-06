import App from "../containers/App";
import { IObject } from "../interfaces";
import { connect } from "react-redux";
import { setIsLoading } from "../store/actions/postsActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: IObject) => {
  return {
    isLoading: state.posts.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
