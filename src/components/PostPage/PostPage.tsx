import React, { useEffect, useState } from "react";

import { Content } from "./Content";
import { IPostPage } from "./interfaces";
import { IState } from "../../interfaces";
import Service from "../../services/service";
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

  const deletePost = () => {
    if (!user?.token) {
      history.push({
        pathname: "/sign-in",
      });
      return;
    }
    if (!slug) return;
    setIsLoading(true);
    const headers = {
      Authorization: `Token ${user.token}`,
    };
    Service.deletePost(slug, headers)
      .then((resp: any) => {
        if (resp?.errors) {
          const keyError = Object.keys(resp.errors)[0];
          const errorMessage = `${keyError} ${
            resp.errors[Object.keys(resp.errors)[0]]
          }`;
          setDeletingError(errorMessage);
          setTimeout(() => setDeletingError(""), 5000);
          return;
        }
        history.push({
          pathname: "/articles",
        });
        return;
      })
      .catch((error) => {
        setDeletingError(error);
      })
      .finally(() => {
        setIsLoading(false);
        setShowDialog(false);
      });
  };
  const favoritePost = (slug: string, favorited: boolean) => {
    if (!user?.token) {
      history.push({
        pathname: "/sign-in",
      });
      return;
    }
    const headers = {
      Authorization: `Token ${user.token}`,
    };
    let action: any;
    if (favorited) {
      action = Service.unfavoritePost(slug, headers);
    } else {
      action = Service.favoritePost(slug, headers);
    }
    action.then((resp: any) => {
      if (resp?.errors) {
        const keyError = Object.keys(resp.errors)[0];
        const errorMessage = `${keyError} ${
          resp.errors[Object.keys(resp.errors)[0]]
        }`;
        setFavoriteError(errorMessage);
        setTimeout(() => setFavoriteError(""), 5000);
        return;
      }
      setPost(resp.article);
    });
  };
  useEffect(() => {
    setIsLoading(true);
    if (!slug) {
      setIsLoading(false);
      setError(true);
      return;
    }
    Service.getPost(slug)
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
    deletePost,
    favoritePost,
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
