import { fetchPostsList, updatePost } from "../store/actions/postsActions";

import { IObject } from "../interfaces";
import Posts from "../containers/Posts";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: IObject) => {
  return {
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
    isError: state.posts.isError,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchPostsList: () => dispatch(fetchPostsList()),
  updatePost: (updatedPostInfo: {}, index: number) =>
    dispatch(updatePost(updatedPostInfo, index)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
