import { IObject } from "../interfaces";
import Posts from "../containers/Posts";
import { connect } from "react-redux";
import { fetchPostsList } from "../store/actions/postsActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: IObject) => {
  return {
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
    isError: state.posts.isError,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchPostsList: () => dispatch(fetchPostsList()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
