import { deletePost, favoritePost } from "./services";
import { useEffect, useState } from "react";

import { Content } from "./Content";
import { IPostPage } from "./interfaces";
import { IState } from "../../interfaces";
import PostService from "../../services/postService";
import { connect } from "react-redux";
import { initialPostState } from "./utils";
import { setIsLoading } from "../../store/actions/postsActions";
import { useHistory } from "react-router-dom";

function PostPage(props: IPostPage) {
  const { match, setIsLoading, user, isLoading } = props;
  const { slug } = match.params;
  let history = useHistory();
  const [post, setPost] = useState(initialPostState);
  const [isError, setError] = useState(false);
  const [favoriteError, setFavoriteError] = useState("");
  const [deletingError, setDeletingError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const toggleDeleteDialog = (showDialog: boolean) => {
    setShowDialog(showDialog);
  };

  const deletePostWrapper = () =>
    deletePost(
      user.token,
      slug,
      history,
      setIsLoading,
      setDeletingError,
      setShowDialog
    );
  const favoritePostWrapper = (slug: string, favorited: boolean) =>
    favoritePost(
      slug,
      favorited,
      user.token,
      history,
      setFavoriteError,
      setPost
    );

  useEffect(() => {
    setIsLoading(true);
    if (!slug) {
      setIsLoading(false);
      setError(true);
      return;
    }
    PostService.getPost(slug)
      .then((resp: any) => {
        if (resp.error) {
          throw new Error(resp.error);
        }
        setPost(resp.article);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return Content({
    slug,
    isError,
    post,
    user,
    toggleDeleteDialog,
    showDialog,
    deletingError,
    deletePost: deletePostWrapper,
    favoritePost: favoritePostWrapper,
    favoriteError,
    isLoading,
  });
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user,
    isLoading: state.posts.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
