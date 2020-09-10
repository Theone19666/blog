import { IObject } from "../interfaces";
import PostPage from "../components/PostPage";
import { connect } from "react-redux";
import { setIsLoading } from "../store/actions/postsActions";

const mapStateToProps = (state: IObject) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
