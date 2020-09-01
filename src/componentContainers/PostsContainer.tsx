import { IObject } from "../interfaces";
import Posts from "../containers/Posts";
import { connect } from "react-redux";
import { setPostsList } from "../store/actions/postsActions";

const mapStateToProps = (state: IObject) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setPostsList: (list: IObject[]) => dispatch(setPostsList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
